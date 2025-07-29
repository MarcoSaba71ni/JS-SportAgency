document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logout-btn");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      const confirmLogout = confirm("Are you sure you want to log out?");
      if (confirmLogout) {
        localStorage.removeItem("user");
        window.location.href = "../account/login.html";
      }
    });
  }

  const storedUserData = localStorage.getItem("user");

  if (storedUserData) {
    const userData = JSON.parse(storedUserData);

    document.getElementById("username").textContent = userData.name || "No username set";
    document.getElementById("email").textContent = userData.email || "No email set";
    document.getElementById("password").textContent = "••••••••";
    document.getElementById("bio").textContent = userData.bio || "No bio available";

    if (userData.banner) {
      document.getElementById("image-url").textContent = userData.banner.url || "No image URL";
      document.getElementById("img-alt").textContent = userData.banner.alt || "No image alt text";
    } else {
      document.getElementById("image-url").textContent = "No image URL";
      document.getElementById("img-alt").textContent = "No image alt text";
    }
  } else {
    ["username", "email", "password", "bio", "image-url", "img-alt"].forEach((id) => {
      document.getElementById(id).textContent = "Not available";
    });
  }


  const editBtn = document.getElementById("edit-btn");
  const sendBtn = document.getElementById("send-btn");

  toggleEditMode(false);

  editBtn.addEventListener("click", () => {
    toggleEditMode(true);
  });

  sendBtn.addEventListener("click", async () => {
    const updatedData = {
      name: document.getElementById("input-username").value.trim(),
      email: document.getElementById("input-email").value.trim(),
      password: document.getElementById("input-password").value.trim(),
      bio: document.getElementById("input-bio").value.trim(),
      banner: {
        url: document.getElementById("input-url").value.trim(),
        alt: document.getElementById("input-alt").value.trim()
      }
    };

    try {
      const updatedUser = await updateUserProfile(updatedData);

      // Update UI <p> elements with new data
      document.getElementById("username").textContent = updatedUser.name || "No username set";
      document.getElementById("email").textContent = updatedUser.email || "No email set";
      document.getElementById("password").textContent = "••••••••";
      document.getElementById("bio").textContent = updatedUser.bio || "No bio available";

      if (updatedUser.banner) {
        document.getElementById("image-url").textContent = updatedUser.banner.url || "No image URL";
        document.getElementById("img-alt").textContent = updatedUser.banner.alt || "No image alt text";
      } else {
        document.getElementById("image-url").textContent = "No image URL";
        document.getElementById("img-alt").textContent = "No image alt text";
      }

      toggleEditMode(false);
      alert("Profile updated successfully!");
    } catch (error) {
      alert("Failed to update profile: " + error.message);
    }
  });

  function toggleEditMode(isEditing) {
    const pElements = document.querySelectorAll("#profile-form p:not(.first-p)");
    const inputs = document.querySelectorAll("#profile-form input.input-account");

    if (isEditing) {
      pElements.forEach(p => (p.style.display = "none"));
      inputs.forEach(input => (input.style.display = "block"));

      inputs.forEach(input => {
        const id = input.id.replace("input-", "");
        const p = document.getElementById(id);
        if (input.id === "input-password") {
          input.value = ""; 
        } else if (p) {
          input.value = p.textContent === "••••••••" ? "" : p.textContent;
        }
      });

      editBtn.style.display = "none";
      sendBtn.style.display = "inline-block";
    } else {
      pElements.forEach(p => (p.style.display = "block"));
      inputs.forEach(input => (input.style.display = "none"));

      editBtn.style.display = "inline-block";
      sendBtn.style.display = "none";
    }
  }
});
