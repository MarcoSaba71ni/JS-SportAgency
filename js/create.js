const createForm = document.getElementById('create-form');
const baseUrl = "https://v2.api.noroff.dev/blog/posts/";

const user = JSON.parse(localStorage.getItem("user"));
const token = user?.accessToken;
const username = user?.name;

createForm.addEventListener("submit", async function createAthlete(e) {
    e.preventDefault();

    const athleteName = document.getElementById('athlete-name').value;
    const biography = document.getElementById('biography').value;
    const imageUrl = document.getElementById('image-url').value;

    if (!athleteName.trim() || !biography.trim() || !imageUrl.trim()) {
        alert("Please fill out all fields.");
        return; 
    }

    const profileData = {
        title: athleteName,
        body: biography,
        media: {
            url: imageUrl,
            alt: athleteName + " image"
        } 
    };

    try {
        const response = await fetch(baseUrl + username, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(profileData),
        });

        const data = await response.json();
        if (response.ok) {
            console.log("Post created:", data);
            alert("Post Created. You are being redirected to Manage Posts Page");
            window.location.href = "../index.html";
        } else {
            console.log("Error:", data);
            alert("Registration Failed: " + (data.errors?.[0]?.message || "Unknown error"));
        }
        
    } catch (error) {
         alert("Oops! Something went wrong. Please try again later.");
    }
});
