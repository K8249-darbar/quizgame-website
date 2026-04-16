const loginForm = document.getElementById("login-form");
const loginMessage = document.getElementById("login-message");
const loginButton = loginForm.querySelector('button[type="submit"]');

if (window.AuthManager && window.AuthManager.isAuthenticated()) {
  window.location.href = "index.html";
}

function setLoginMessage(message, isError) {
  loginMessage.textContent = message;
  loginMessage.classList.toggle("error", Boolean(isError));
  loginMessage.classList.toggle("success", !isError && Boolean(message));
}

function setLoadingState(isLoading) {
  loginButton.disabled = isLoading;
  loginButton.textContent = isLoading ? "Signing in..." : "Login";
}

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  setLoginMessage("", true);

  if (!window.AuthManager) {
    setLoginMessage("Authentication service is unavailable.", true);
    return;
  }

  setLoadingState(true);

  const identifier = String(loginForm.identifier.value || "").trim();
  const password = String(loginForm.password.value || "");
  const rememberMe = Boolean(loginForm.rememberMe && loginForm.rememberMe.checked);

  if (!identifier || !password) {
    setLoginMessage("Please enter your username/email and password.", true);
    setLoadingState(false);
    return;
  }

  const result = window.AuthManager.loginUser(identifier, password, rememberMe);
  if (!result.ok) {
    setLoginMessage(result.message, true);
    setLoadingState(false);
    return;
  }

  setLoginMessage("Login successful. Redirecting...", false);
  window.location.href = "index.html";
});
