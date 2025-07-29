document.addEventListener("DOMContentLoaded", () => {
  displayAthlete();
});

async function displayAthlete() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const playerId = urlParams.get("id");

  if (!playerId) {
    console.error("No player ID found in URL.");
    return;
  }

  try {
    let response = await fetch(`https://v2.api.noroff.dev/blog/posts/sabatini/${playerId}`);

    if (!response.ok) {
      const user = JSON.parse(localStorage.getItem("user"));
      const username = user?.name;

      if (username) {
        response = await fetch(`https://v2.api.noroff.dev/blog/posts/${username}/${playerId}`);
      }

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    }

    const result = await response.json();
    const player = result.data;

    generatePlayer(player);
  } catch (error) {
    document.getElementById("single-athlete").innerHTML = `<p>Could not load athlete. Please try again later.</p>`;
  }
}


function generatePlayer(player) {
  const singleAthlete = document.getElementById("single-athlete");
  singleAthlete.innerHTML = ""; 

  const flexWrapper = document.createElement("div");
  flexWrapper.className = "athlete-styling";

  const imgDiv = document.createElement("div");
  imgDiv.className = "single-section";
  const singleImg = document.createElement("img");
  singleImg.src = player.media.url;
  singleImg.alt = player.media.alt || player.title;
  singleImg.className = "single-img";

  const textDiv = document.createElement("div");
  textDiv.className = "text-section";
  const playerName = document.createElement("h1");
  playerName.textContent = player.title;
  playerName.className = "single-name";

  const playerBio = document.createElement("p");
  playerBio.textContent = player.body;

  flexWrapper.appendChild(imgDiv);
  flexWrapper.appendChild(textDiv);

  imgDiv.appendChild(singleImg);
  textDiv.appendChild(playerName);
  textDiv.appendChild(playerBio);

  singleAthlete.appendChild(flexWrapper);


  const user = JSON.parse(localStorage.getItem("user"));
  const username = user?.name;
  const token = user?.accessToken;

  if (token && (username === player.author.name || username === "sabatini")) {
  


    const buttonWrapper = document.createElement("div");
    buttonWrapper.id = "button-section";
    buttonWrapper.className = "button-wrapper";

    const editBtn = document.createElement("button");
    editBtn.className = "button_cta";
    editBtn.textContent = "Edit";
    editBtn.onclick = postEdit;

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "button_cta";
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = deletePost;

    buttonWrapper.appendChild(editBtn);
    buttonWrapper.appendChild(deleteBtn);

    singleAthlete.appendChild(buttonWrapper);
  }
}



function postEdit() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");  

  if(id) {
    window.location.href =  `edit.html?id=${id}`;
  } else {
    alert("Sorry, something went wrong.")
  }
};


async function deletePost() {

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get("id");

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.accessToken;
  const username = user?.name;


  if (!id || !token || !username) {
    alert("Missing post ID, login username or access token.");
    return;
  }

  const confirmDelete = confirm("Are you sure you want to delete this post?"); 
  if (!confirmDelete) return;

  try {
    const response = await fetch(`https://v2.api.noroff.dev/blog/posts/${username}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    if (response.ok) {
      alert("Post deleted successfully.");
      window.location.href = "../index.html";
    } else {
      const errorData = await response.json();
      alert("Failed to delete post: " + (errorData.errors?.[0]?.message || "Unknown error"));
    }
  } catch (error) {
    alert("Something went wrong while trying to delete the post.");
  }
}
