const AUTH_USERS_KEY = "ce_quiz_users_v2";
const AUTH_SESSION_KEY = "ce_quiz_session_v2";

function parseJson(value, fallback) {
  try {
    const parsed = JSON.parse(value);
    return parsed ?? fallback;
  } catch (error) {
    return fallback;
  }
}

function getUsers() {
  const stored = localStorage.getItem(AUTH_USERS_KEY);
  const users = parseJson(stored, []);
  return Array.isArray(users) ? users : [];
}

function saveUsers(users) {
  localStorage.setItem(AUTH_USERS_KEY, JSON.stringify(users));
}

function normalizeUsername(username) {
  return String(username || "").trim().toLowerCase();
}

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidUsername(username) {
  return /^[a-zA-Z0-9._-]{3,24}$/.test(username);
}

function getSession() {
  const sessionStored = sessionStorage.getItem(AUTH_SESSION_KEY);
  const localStored = localStorage.getItem(AUTH_SESSION_KEY);
  return parseJson(sessionStored || localStored, null);
}

function setSession(user, rememberUser) {
  const safeUser = {
    fullName: user.fullName,
    username: user.username,
    email: user.email,
    loginAt: new Date().toISOString()
  };

  if (rememberUser) {
    localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(safeUser));
    sessionStorage.removeItem(AUTH_SESSION_KEY);
    return;
  }

  sessionStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(safeUser));
  localStorage.removeItem(AUTH_SESSION_KEY);
}

function clearSession() {
  sessionStorage.removeItem(AUTH_SESSION_KEY);
  localStorage.removeItem(AUTH_SESSION_KEY);
}

function isAuthenticated() {
  return Boolean(getSession());
}

function seedDefaultUser() {
  const users = getUsers();
  const hasAdmin = users.some(
    (user) => normalizeUsername(user.username) === "admin"
  );

  if (hasAdmin) {
    return;
  }

  users.push({
    fullName: "Admin User",
    username: "admin",
    email: "admin@quiz.local",
    password: "admin123",
    createdAt: new Date().toISOString()
  });

  saveUsers(users);
}

function registerUser(payload) {
  const fullName = String(payload.fullName || "").trim();
  const username = String(payload.username || "").trim();
  const email = String(payload.email || "").trim();
  const password = String(payload.password || "");

  if (!fullName || !username || !email || !password) {
    return { ok: false, message: "All fields are required." };
  }

  if (!isValidUsername(username)) {
    return {
      ok: false,
      message: "Username must be 3-24 characters (letters, numbers, . _ -)."
    };
  }

  if (!isValidEmail(email)) {
    return { ok: false, message: "Please enter a valid email address." };
  }

  if (password.length < 6) {
    return { ok: false, message: "Password must be at least 6 characters." };
  }

  const users = getUsers();
  const usernameExists = users.some(
    (user) => normalizeUsername(user.username) === normalizeUsername(username)
  );
  if (usernameExists) {
    return { ok: false, message: "Username is already taken." };
  }

  const emailExists = users.some(
    (user) => normalizeEmail(user.email) === normalizeEmail(email)
  );
  if (emailExists) {
    return { ok: false, message: "Email is already registered." };
  }

  users.push({
    fullName,
    username,
    email,
    password,
    createdAt: new Date().toISOString()
  });

  saveUsers(users);
  return { ok: true, message: "Registration successful." };
}

function loginUser(identifier, password, rememberUser) {
  const normalizedIdentifier = String(identifier || "").trim().toLowerCase();
  const rawPassword = String(password || "");
  const users = getUsers();

  const user = users.find((item) => {
    return (
      normalizeUsername(item.username) === normalizedIdentifier ||
      normalizeEmail(item.email) === normalizedIdentifier
    );
  });

  if (!user || user.password !== rawPassword) {
    return { ok: false, message: "Invalid email/username or password." };
  }

  setSession(user, Boolean(rememberUser));
  return { ok: true, user };
}

seedDefaultUser();

window.AuthManager = {
  getUsers,
  registerUser,
  loginUser,
  isAuthenticated,
  getSession,
  clearSession
};
