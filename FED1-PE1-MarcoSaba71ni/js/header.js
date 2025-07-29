
const hamburgerBtn = document.getElementById('hamburguer-btn');
const dropdown = document.getElementById('drop-down');

hamburgerBtn.addEventListener('click', () => {
  dropdown.classList.toggle('open');
});

document.addEventListener('click', (event) => {
  if (!hamburgerBtn.contains(event.target) && !dropdown.contains(event.target)) {
    dropdown.classList.remove('open');
  }
});


document.addEventListener("click", function (event) {
  const headerLogoutBtn = document.getElementById("header-logout");

  if (event.target === headerLogoutBtn) {
    const confirmLogout = confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem("user");
      window.location.href = "../index.html";
    }
  }
});

