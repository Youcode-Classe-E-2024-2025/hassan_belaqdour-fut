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
