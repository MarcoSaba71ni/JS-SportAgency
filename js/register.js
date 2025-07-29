const registerForm = document.getElementById('register-form');
const registerUrl = "https://v2.api.noroff.dev/auth/register";

registerForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const bio = document.getElementById('bio').value.trim();
    const bannerUrl = document.getElementById('img-banner').value.trim();
    const bannerAlt = document.getElementById('banner-alt').value.trim();

    const userData = {
        name,
        email,
        password,
        bio: bio || "",
        venueManager: false
    };
    if (bannerUrl) {
    userData.banner = {
        url: bannerUrl,
        alt: bannerAlt || "User banner image"
    };
}

    try {
        const response = await fetch(registerUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        const data = await response.json();

        if (response.ok) {
            alert("Registration successful. Now you can log in.");

            window.location.href = "../account/login.html";

        } else {
            alert("Registration failed: " + (data.errors?.[0]?.message || "Unknown error"));
        }
    } catch (error) {

        alert("Something went wrong. Please try again.");
    }
});
