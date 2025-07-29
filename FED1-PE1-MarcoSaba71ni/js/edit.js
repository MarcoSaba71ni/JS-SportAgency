const editForm = document.querySelector('.create-form');

const user = JSON.parse(localStorage.getItem("user"));
const username = user?.name;
const token = user?.accessToken;
const editUrlBase = `https://v2.api.noroff.dev/blog/posts/${username}/`;


const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const athleteId = urlParams.get("id");



editForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const athleteName = document.getElementById('athlete-name').value.trim();
    const athleteBio = document.getElementById('athlete-bio').value.trim();
    const athleteUrl = document.getElementById("athlete-url").value.trim();

    const athleteAlt = document.getElementById("athlete-alt")?.value.trim() || athleteName;

    if (!athleteName || !athleteBio || !athleteUrl) {
        alert("Please fill in all fields before updating.");
        return;
    }

    const updatedData = {
        title: athleteName,
        body: athleteBio,
        tags: [],  
        media: {
            url: athleteUrl,
            alt: athleteAlt,
        }
    };

    const putUrl = editUrlBase + athleteId;
    console.log("PUT URL:", putUrl);

    try {
        const response = await fetch(putUrl, {
            method: "PUT", 
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
        });

        const data = await response.json();

        if (response.ok) {
            alert("Athlete updated successfully!");
            window.location.href = `athlete.html?id=${athleteId}`;
        } else {
            alert("Failed to update athlete: " + (data.errors?.[0]?.message || "Unknown error"));
        }
    } catch (error) {
        alert("Error updating athlete. See console for details.");
    }
});

async function populateForm() {
    console.log("Running populateForm()");
    console.log("athleteId:", athleteId);

    try {
        const response = await fetch(`${editUrlBase}${athleteId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        const json = await response.json();

        const data = json.data;

        if (response.ok && data) {
            console.log("✅ API data:", data);
            console.log("title:", data.title);
            console.log("body:", data.body);
            console.log("media:", data.media);
            console.log("media.url:", data.media?.url);
            console.log("media.alt:", data.media?.alt);

            document.getElementById("athlete-name").value = data.title || "";
            document.getElementById("athlete-bio").value = data.body || "";
            document.getElementById("athlete-url").value = data.media?.url || "";
            

            if (document.getElementById("athlete-alt")) {
                document.getElementById("athlete-alt").value = data.media?.alt || "";
            }

            const preview = document.getElementById("image-preview");
            if (preview && data.media?.url) {
                preview.src = data.media.url;
                preview.alt = data.media.alt || data.title || "Athlete image";
            }
        } else {
            alert("Could not load athlete info for editing.");
        }
    } catch (error) {
        alert("Something went wrong loading athlete data.");
    }
}

populateForm();
