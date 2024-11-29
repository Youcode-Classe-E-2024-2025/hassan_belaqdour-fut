let listeP = [];

fetch("./src/data.json")
  .then((response) => response.json())
  .then((players) => {
    listeP = JSON.parse(localStorage.getItem("players")) || players;
    localStorage.setItem("players", JSON.stringify(listeP));
  })
  .catch((error) => {
    console.error("Error fetching players data:", error);
    alert("Failed to load players data.");
  });
let players = JSON.parse(localStorage.getItem("players")) || [];
document.addEventListener("DOMContentLoaded", () => {
  const openModal = document.getElementById("openModal");
  const closeModal = document.getElementById("closeModal");
  const playerModal = document.getElementById("playerModal");
  const playerForm = document.getElementById("playerForm");
  const downloadButton = document.getElementById("downloadButton");

  // Open modal
  openModal.addEventListener("click", () => {
    playerModal.classList.remove("hidden");
  });

  // Close modal
  closeModal.addEventListener("click", () => {
    playerModal.classList.add("hidden");
  });
  // Handle form submission
  playerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const playerData = {
      name: document.getElementById("name").value,
      photo: document.getElementById("photo").value,
      position: document.getElementById("position").value,
      flag: document.getElementById("flag").value,
      logo: document.getElementById("logo").value,
      rating: parseInt(document.getElementById("rating").value, 10),
      pace: parseInt(document.getElementById("pace").value, 10),
      shooting: parseInt(document.getElementById("shooting").value, 10),
      passing: parseInt(document.getElementById("passing").value, 10),
      dribbling: parseInt(document.getElementById("dribbling").value, 10),
      defending: parseInt(document.getElementById("defending").value, 10),
      physical: parseInt(document.getElementById("physical").value, 10),
    };

    // Add the player data to local storage
    listeP.push(playerData);
    localStorage.setItem("players", JSON.stringify(listeP));

    alert("Player data saved successfully!");

    // Hide the modal
    playerModal.classList.add("hidden");
  });
