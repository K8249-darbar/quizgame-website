const registerForm = document.getElementById("register-form");
const registerMessage = document.getElementById("register-message");
const registerButton = registerForm.querySelector('button[type="submit"]');

if (window.AuthManager && window.AuthManager.isAuthenticated()) {
  window.location.href = "index.html";
}

function setRegisterMessage(message, isError) {
  registerMessage.textContent = message;
  registerMessage.classList.toggle("error", Boolean(isError));
  registerMessage.classList.toggle("success", !isError);
}

function setLoadingState(isLoading) {
  registerButton.disabled = isLoading;
  registerButton.textContent = isLoading ? "Registering..." : "Register";
}

registerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  setRegisterMessage("", true);

  if (!window.AuthManager) {
    setRegisterMessage("Authentication service is unavailable.", true);
    return;
  }

  setLoadingState(true);

  const fullName = String(registerForm.fullName.value || "").trim();
  const username = String(registerForm.username.value || "").trim();
  const email = String(registerForm.email.value || "").trim();
  const password = String(registerForm.password.value || "");
  const confirmPassword = String(registerForm.confirmPassword.value || "");

  if (!fullName || !username || !email || !password || !confirmPassword) {
    setRegisterMessage("Please fill in all fields.", true);
    setLoadingState(false);
    return;
  }

  if (password !== confirmPassword) {
    setRegisterMessage("Password and Confirm Password must match.", true);
    setLoadingState(false);
    return;
  }

  const result = window.AuthManager.registerUser({
    fullName,
    username,
    email,
    password
  });

  if (!result.ok) {
    setRegisterMessage(result.message, true);
    setLoadingState(false);
    return;
  }

  setRegisterMessage("Registration successful. Redirecting to login...", false);
  registerForm.reset();
  setLoadingState(false);

  setTimeout(() => {
    window.location.href = "login.html";
  }, 700);
});
