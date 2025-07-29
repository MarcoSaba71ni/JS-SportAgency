

  document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("user"));

    const iconHeader = document.getElementById('icon-header');
    const profileHeader = document.getElementById('profile-header');

    if(user?.accessToken) {
      iconHeader.style.display = "block";
      profileHeader.style.display = "none";
    } else {
      iconHeader.style.display = "none";
      profileHeader.style.display = "block";
    }

  const loginLink = document.getElementById("login-link");
  const createLink = document.getElementById("create-link");

  if (user?.accessToken) {
    loginLink.style.display = "none";
    createLink.style.display = "block";
  } else {
    loginLink.style.display = "block";
    createLink.style.display = "none";
  }

  const linkCreate = document.getElementById("link-create");
  const linkLogin = document.getElementById("link-login");

  if (user?.accessToken) {
    linkCreate.style.display = "block";
    linkLogin.style.display = "none";
  } else {
    linkCreate.style.display = "none";
    linkLogin.style.display = "block";
  }

  const createAssembler =  document.getElementById("create-a");
  const loginAssembler = document.getElementById("login-a");

  if (user?.accessToken) {
    createAssembler.style.display = "block";
    loginAssembler.style.display = "none";
  } else {
    createAssembler.style.display = "none";
    loginAssembler.style.display = "block";
  }

  const mobileRegistration = document.getElementById('mobile-registration');

  if(user?.accessToken) {
    mobileRegistration.style.display = "none";
  } else {
        mobileRegistration.style.display = "block";

  }

  });

  // Carousel

  window.onload = async function () {

    let current = 0;
    let players = [];

    function addOne () {
        if (current === 2) {
            current = 0;
        } else {
            current = (current + 1) % players.length;
        }
        displayCarouselAthlete();
    }

    function subtractOne() {
        if (current === players.length - 1) {
        current = 0;
      } else {
         current = (current - 1 + players.length) % players.length;
        displayCarouselAthlete();
      }
    }

document.getElementById('right-btn').addEventListener("click", function (event) {
    event.preventDefault();
    addOne();
});

document.getElementById('left-btn').addEventListener("click", function (event) {
    event.preventDefault();
    subtractOne();
});

    function generateCarouselAthlete (player) {
        const carousel = document.getElementById('carousel');

        const carouselLink = document.createElement('a');
        carouselLink.href = `post/athlete.html?id=${player.id}`;
        const carouselTxt = document.createElement('h3');
        carouselTxt.className = "carousel-text";
        carouselTxt.textContent = player.title;
        carouselTxt.style.backgroundImage = `url('${player.media.url}')`; 
        carouselTxt.style.backgroundSize = "cover";

        carousel.appendChild(carouselLink);
        carouselLink.appendChild(carouselTxt);
    }

    async function displayCarouselAthlete() {
        const carousel = document.getElementById('carousel');
        carousel.innerHTML = " ";
                if (players.length === 0) {
            try {
                const response = await fetch("https://v2.api.noroff.dev/blog/posts/sabatini");
                const data = await response.json();
                players = data.data;
            } catch (error) {
                alert("Failed to fetch carousel players:", error);
                return;
            }
        }

        const currentAthlete = players[current];
        generateCarouselAthlete(currentAthlete);
    }

displayCarouselAthlete();

}
  
  document.addEventListener("DOMContentLoaded", async () => {
    const athleteSection = document.getElementById("athletes-section");

    try {
        const response = await fetch("https://v2.api.noroff.dev/blog/posts/sabatini");
        const data = await response.json();
        const athletes = data.data;
      
    if (!athletes || athletes.length === 0) {
        return;
 }
  
    athleteSection.innerHTML = "";

    athletes.forEach((athlete) => {
        const athleteElement = generateAthlete(athlete); 
        athleteSection.appendChild(athleteElement); 
    });

    } catch (error) {
      athleteSection.innerHTML = "<p>Failed to load athletes.</p>";
    }
  });

function generateAthlete(athlete) {

    const athleteLink = document.createElement('a');
    athleteLink.href = `post/athlete.html?id=${athlete.id}`;
    athleteLink.className = "athlete-link";

    const athleteElement = document.createElement('div');
    athleteElement.className = "athlete-card";

    if (athlete.media && athlete.media.url) {
        const athleteImg = document.createElement('img');
        athleteImg.src = athlete.media.url;
        athleteImg.alt = athlete.media.alt || "Athlete image";
        athleteImg.className = "athlete-img";
        athleteElement.appendChild(athleteImg);
    }
    
    const athleteName = document.createElement('h4');
    athleteName.textContent = athlete.title;
    athleteName.className = "athlete-name";

    const readMore = document.createElement('a');
    readMore.href = `post/athlete.html?id=${athlete.id}`;
    readMore.textContent = "Read More";

    
    athleteElement.appendChild(athleteName);
    athleteElement.appendChild(readMore);
    

    athleteLink.appendChild(athleteElement);

    return athleteLink;
}


document.addEventListener("DOMContentLoaded", () => {
  const userSection = document.getElementById("user-posts-section");
  const user = JSON.parse(localStorage.getItem("user"));
  const username = user?.name;
  const token = user?.accessToken;

  while (userSection.firstChild) {
    userSection.removeChild(userSection.firstChild);
  }

  if (!username) {
    const ctaDiv = document.createElement("div");
    ctaDiv.className = "user-posts-cta";

    const heading = document.createElement("h2");
    heading.textContent = "Wanna see your own posts?";
    ctaDiv.appendChild(heading);

    const para = document.createElement("p");
    const loginLink = document.createElement("a");
    loginLink.href = "account/login.html";
    loginLink.textContent = "Log in";

    para.appendChild(loginLink);
    para.appendChild(document.createTextNode(" to view your published athletes here."));
    ctaDiv.appendChild(para);

    userSection.appendChild(ctaDiv);
  } else {
    fetch(`https://v2.api.noroff.dev/blog/posts/${username}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      if (!res.ok) throw new Error("Failed to fetch user posts");
      return res.json();
    })
    .then(data => {
      const posts = data.data;


      const header = document.createElement("h2");
      header.textContent = "Your Posts";

      const paragraph = document.createElement("p");
      paragraph.textContent = "Here are your posts as: " + username;

      userSection.appendChild(header);
      userSection.appendChild(paragraph);

      if (!posts.length) {
  
        const noPostsPara = document.createElement("p");
        noPostsPara.textContent = "You haven't created any athletes yet. ";

        const createLink = document.createElement("a");
        createLink.href = "post/create.html";
        createLink.textContent = "Create one now!";

        noPostsPara.appendChild(createLink);
        userSection.appendChild(noPostsPara);
        return;
      }

      const container = document.createElement("div");
      container.className = "user-posts-grid";
      userSection.appendChild(container);

      posts.forEach(post => {
        const cardLink = document.createElement("a");
        cardLink.href = `post/athlete.html?id=${post.id}`;
        cardLink.className = "athlete-card-link";

        const card = document.createElement("div");
        card.className = "athlete-card";

        if (post.media && post.media.url) {
          const img = document.createElement("img");
          img.src = post.media.url;
          img.alt = post.media.alt || "Athlete image";
          img.className = "athlete-img";
          card.appendChild(img);
        }

        const name = document.createElement("h4");
        name.textContent = post.title;
        card.appendChild(name);

        cardLink.appendChild(card);

        container.appendChild(cardLink);


        if (post.owner === username) {
          const editLink = document.createElement("a");
          editLink.href = `post/edit.html?id=${post.id}`;
          editLink.textContent = "Edit";
          editLink.className = "edit-link";
          container.appendChild(editLink);
        }


      });
    })
    .catch(err => {
      const errorMsg = document.createElement("p");
      errorMsg.textContent = "Could not load your posts right now.";
      userSection.appendChild(errorMsg);
    });
  }
});




