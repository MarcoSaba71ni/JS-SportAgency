const loginForm = document.getElementById("login-form");
const loginUrl = "https://v2.api.noroff.dev/auth/login";

loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();


    const credentials = {
        email,
        password,
    };

        if (!email || !password) {
        alert("Inputs can't be blancked!")
    }

    try {
        const response = await fetch(loginUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials)
        });

        const result = await response.json();

        if (response.ok) {
            // Store the user object with accessToken and other useful info
            const data = result.data;
            const user = {
                name: data.name,
                email: data.email,
                bio: data.bio || "",
                banner: data.banner || { url: "", alt: "" },
                accessToken: data.accessToken
            };
            localStorage.setItem("user", JSON.stringify(user));


            alert("Login successful.");
            window.location.href = "../index.html";
        } else {
            alert("Login failed: " + (data.errors?.[0]?.message || "Unknown error"));
        }
    } catch (error) {
        alert("Something went wrong. Please try again.");
    }
});
