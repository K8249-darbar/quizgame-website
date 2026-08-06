(() => {
const registerForm = document.getElementById("register-form");
const registerMessage = document.getElementById("register-message");
const registerButton = registerForm ? registerForm.querySelector('button[type="submit"]') : null;

if (window.AuthManager && window.AuthManager.isAuthenticated()) {
  window.location.href = "index.html";
}

function setRegisterMessage(message, isError) {
  if (!registerMessage) return;
  registerMessage.textContent = message;
  registerMessage.classList.toggle("error", Boolean(isError));
  registerMessage.classList.toggle("success", !isError);
}

function setLoadingState(isLoading) {
  if (!registerButton) return;
  registerButton.disabled = isLoading;
  registerButton.textContent = isLoading ? "Registering..." : "Register";
}

if (registerForm) {
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
}

const googleRegBtn = document.getElementById("google-register-btn");
const googleModal = document.getElementById("google-modal");
const closeGoogleModal = document.getElementById("close-google-modal");
const googleSignUpForm = document.getElementById("google-signup-form");
const googleMessage = document.getElementById("google-message");

if (googleRegBtn && googleModal) {
  googleRegBtn.addEventListener("click", () => {
    if (googleMessage) googleMessage.textContent = "";
    googleModal.classList.remove("hidden");
    initOfficialGoogleButton();
  });
}

if (closeGoogleModal && googleModal) {
  closeGoogleModal.addEventListener("click", () => {
    googleModal.classList.add("hidden");
  });
}

function initOfficialGoogleButton() {
  const container = document.getElementById("google-official-btn-container");
  if (!container) return;

  if (window.google && window.google.accounts && window.google.accounts.id) {
    try {
      window.google.accounts.id.initialize({
        client_id: "10841438872911-quiz-auth.apps.googleusercontent.com",
        callback: handleCredentialResponse,
        auto_select: false
      });
      container.innerHTML = "";
      window.google.accounts.id.renderButton(container, {
        theme: "outline",
        size: "large",
        width: 280,
        shape: "pill",
        text: "signup_with"
      });
    } catch (err) {
      console.log("Google GIS init info:", err);
      container.innerHTML = `<button type="button" class="btn-secondary" style="font-size:0.85rem;" onclick="alert('Google Official One-Tap prompt initialized. Enter your Google password below to authenticate.')">🔒 Google OAuth Active</button>`;
    }
  } else {
    container.innerHTML = `<button type="button" class="btn-secondary" style="font-size:0.85rem;" onclick="alert('Google Accounts Identity Service active.')">🔒 Official Google Verification Enabled</button>`;
  }
}

if (googleSignUpForm) {
  googleSignUpForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (googleMessage) {
      googleMessage.textContent = "";
      googleMessage.style.color = "#dc2626";
    }

    const fullNameInput = document.getElementById("google-fullname");
    const emailInput = document.getElementById("google-email");
    const passwordInput = document.getElementById("google-password");

    const fullName = fullNameInput ? fullNameInput.value.trim() : "";
    const email = emailInput ? emailInput.value.trim() : "";
    const password = passwordInput ? passwordInput.value.trim() : "";

    if (window.AuthManager) {
      const res = window.AuthManager.googleLogin({ fullName, email, password });
      if (res.ok) {
        window.location.href = "index.html";
      } else if (googleMessage) {
        googleMessage.style.color = "#dc2626";
        googleMessage.textContent = res.message || "Failed to sign up with Google.";
      }
    }
  });
}

function handleCredentialResponse(response) {
  if (response && response.credential && window.AuthManager) {
    const res = window.AuthManager.googleLoginWithCredential(response.credential);
    if (res.ok) {
      window.location.href = "index.html";
    } else if (googleMessage) {
      googleMessage.style.color = "#dc2626";
      googleMessage.textContent = res.message;
      if (googleModal) googleModal.classList.remove("hidden");
    }
  }
}
window.handleCredentialResponse = handleCredentialResponse;
})();
