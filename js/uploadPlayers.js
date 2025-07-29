const APIUrl = "https://v2.api.noroff.dev/blog/posts/sabatini";
const token = localStorage.getItem("accessToken");

const playerWithIssues = [
  {
    name: "Marco Sabatini",
    images: ["https://i.postimg.cc/xThQXyVS/sabatini-img00.jpg"],
    country: "Brazil",
    position: "Midfielder",
    age: 26,
    description: "None",
  },
  {
    name: "Otman",
    images: ["https://i.postimg.cc/QMB0H1Dv/omtan-img01.jpg"],
    country: "Morocco",
    position: "Midfielder",
    age: 26,
    description: "None",
  },
  {
    name: "Hamza",
    images: ["https://i.postimg.cc/0j1s1CvP/hamza-img00.jpg"],
    country: "Spain",
    position: "Winger",
    age: 23,
    description: "None",
  },
];

async function uploadPlayers() {
  for (const player of playerWithIssues) {
    const postData = {
      title: player.name,
      body: `
        Country: ${player.country}
        Position: ${player.position}
        Age: ${player.age}
        Description: ${player.description}
      `,
      tags: [player.country, player.position, `${player.age}`, player.name],
      media: {
        url: player.images[0],
        alt: `${player.name} main image`,
      },
    };

    console.log("Uploading:", player.name);
    console.log("Media URL:", postData.media.url);
    console.log("Tags:", postData.tags);

    try {
      const response = await fetch(APIUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postData),
      });

      const result = await response.json();

      if (response.ok) {
        console.log(` Uploaded: ${player.name}`);
      } else {
        console.error(`Failed to upload ${player.name}:`, result.errors || result);
      }
    } catch (error) {
      console.error(` Error uploading ${player.name}:`, error);
    }
  }
}

uploadPlayers();
