(() => {
  if (!window.AuthManager || !window.AuthManager.isAuthenticated()) {
    window.location.replace("login.html");
  }

  const avatarImg = document.getElementById("profile-avatar-img");
  const displayName = document.getElementById("profile-display-name");
  const usernameText = document.getElementById("profile-username");
  const emailBadge = document.getElementById("profile-email-badge");
  const fullNameInput = document.getElementById("profile-fullname-input");
  const bioInput = document.getElementById("profile-bio-input");
  const fileUpload = document.getElementById("avatar-file-upload");
  const profileForm = document.getElementById("profile-form");
  const profileMsg = document.getElementById("profile-msg");

  let selectedAvatarUrl = "";

  if (avatarImg) {
    avatarImg.onerror = () => {
      const session = window.AuthManager ? window.AuthManager.getSession() : null;
      const name = session ? (session.fullName || session.username) : "User";
      avatarImg.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0D5C4E&color=fff&bold=true`;
    };
  }

  function populateProfile() {
    const session = window.AuthManager ? window.AuthManager.getSession() : null;
    if (!session) return;

    selectedAvatarUrl = session.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(session.fullName || session.username)}&background=0D5C4E&color=fff&bold=true`;

    if (displayName) displayName.textContent = session.fullName || session.username;
    if (usernameText) usernameText.textContent = `@${session.username}`;
    if (emailBadge) emailBadge.textContent = session.email || (session.isGuest ? "Guest Account" : "Registered User");

    if (fullNameInput) fullNameInput.value = session.fullName || "";
    if (bioInput) bioInput.value = session.bio || "";
    if (avatarImg) avatarImg.src = selectedAvatarUrl;

    const currentUserBadge = document.getElementById("current-user") || document.getElementById("current-user-badge");
    if (currentUserBadge) {
      const name = session.fullName || session.username;
      currentUserBadge.innerHTML = `
        <span class="user-badge-flex">
          <img src="${selectedAvatarUrl}" class="user-header-avatar" alt="${name}" onerror="this.onerror=null;this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0D5C4E&color=fff&bold=true';" />
          <span class="user-name">${name}</span>
        </span>
      `;
    }
  }

  window.populateProfile = populateProfile;

  document.querySelectorAll(".avatar-option").forEach((img) => {
    img.addEventListener("click", () => {
      selectedAvatarUrl = img.getAttribute("data-url");
      if (avatarImg) avatarImg.src = selectedAvatarUrl;
      document.querySelectorAll(".avatar-option").forEach(opt => opt.classList.remove("selected"));
      img.classList.add("selected");
    });
  });

  if (fileUpload) {
    fileUpload.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        if (!file.type.startsWith("image/")) {
          alert("Please select a valid image file.");
          return;
        }
        if (file.size > 10 * 1024 * 1024) {
          alert("Image file size must be less than 10MB.");
          return;
        }
        const reader = new FileReader();
        reader.onload = (event) => {
          const rawDataUrl = event.target.result;
          selectedAvatarUrl = rawDataUrl;
          if (avatarImg) avatarImg.src = rawDataUrl;

          document.querySelectorAll(".avatar-option").forEach(opt => opt.classList.remove("selected"));

          // Process image using Canvas for fast lightweight storage (~120x120 JPEG)
          const img = new Image();
          img.onload = () => {
            try {
              const canvas = document.createElement("canvas");
              const ctx = canvas.getContext("2d");
              const targetSize = 140;
              canvas.width = targetSize;
              canvas.height = targetSize;

              let sx = 0, sy = 0, sw = img.width, sh = img.height;
              if (img.width > img.height) {
                sw = img.height;
                sx = (img.width - img.height) / 2;
              } else {
                sh = img.width;
                sy = (img.height - img.width) / 2;
              }

              ctx.drawImage(img, sx, sy, sw, sh, 0, 0, targetSize, targetSize);
              const compressed = canvas.toDataURL("image/jpeg", 0.8);
              if (compressed) {
                selectedAvatarUrl = compressed;
                if (avatarImg) avatarImg.src = compressed;
              }
            } catch (err) {
              console.warn("Canvas compression fallback to raw upload data:", err);
            }
          };
          img.onerror = () => {
            console.warn("Could not load image into Canvas, using raw data URL.");
          };
          img.src = rawDataUrl;
        };
        reader.readAsDataURL(file);
      }
    });
  }

  if (profileForm) {
    profileForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const newFullName = fullNameInput ? fullNameInput.value.trim() : "";
      const newBio = bioInput ? bioInput.value.trim() : "";

      const res = window.AuthManager.updateUserProfile({
        fullName: newFullName,
        bio: newBio,
        avatarUrl: selectedAvatarUrl
      });

      if (profileMsg) {
        profileMsg.textContent = res.ok ? "✅ Profile updated successfully!" : res.message;
        profileMsg.style.color = res.ok ? "#166534" : "#b91c1c";
        setTimeout(() => { profileMsg.textContent = ""; }, 3500);
      }

      if (res.ok) {
        populateProfile();
      }
    });
  }

  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      if (confirm("Do you want to logout from the quiz portal?")) {
        if (window.AuthManager) {
          window.AuthManager.clearSession();
        }
        window.location.href = "login.html";
      }
    });
  }

  populateProfile();
})();
