

// function displayPlayer(card, player) {
//   card.innerHTML = `
//   <div class="flex items-center space-x-4">
//           <img src="${player.photo}" alt="${player.name}" class="w-16 h-16 rounded-full object-cover">
//           <div>
//             <h3 class="font-bold text-lg">${player.name}</h3>
//             <p class="text-sm text-gray-500">${player.position} - ${player.club}</p>
//           </div>
//         </div>
//         <div class="mt-3">
//           <img src="${player.flag}" alt="${player.nationality}" class="w-8 h-5 inline-block">
//           <span class="text-sm font-medium text-gray-700">${player.nationality}</span>
//         </div>
//         <ul class="mt-2 grid grid-cols-2 gap-2 text-sm">
//           <li><strong>Rating:</strong> ${player.rating}</li>
//           <li><strong>Pace:</strong> ${player.pace}</li>
//           <li><strong>Shooting:</strong> ${player.shooting}</li>
//           <li><strong>Passing:</strong> ${player.passing}</li>
//           <li><strong>Dribbling:</strong> ${player.dribbling}</li>
//           <li><strong>Defending:</strong> ${player.defending}</li>
//           <li><strong>Physical:</strong> ${player.physical}</li>
//         </ul>
//   `;
// }



// function removeDiv(button) {
//   // Find the parent element of the button (the div) and remove it
//   const parentDiv = button.parentElement;
//   if (parentDiv) {
//     parentDiv.remove();
//   }
// }






// --------------------------- Initialisation et Récupération des données ---------------------------
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

// --------------------------- Gestion du Modal pour Ajouter un Joueur ---------------------------
document.addEventListener("DOMContentLoaded", () => {
  const openModal = document.getElementById("openModal");
  const closeModal = document.getElementById("closeModal");
  const playerModal = document.getElementById("playerModal");
  const playerForm = document.getElementById("playerForm");

  // Ouvrir le modal
  openModal.addEventListener("click", () => {
    playerModal.classList.remove("hidden");
  });

  // Fermer le modal
  closeModal.addEventListener("click", () => {
    playerModal.classList.add("hidden");
  });

  // Gestion de l'ajout d'un joueur via le formulaire
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

    // Ajouter le joueur dans la liste et sauvegarder dans localStorage
    listeP.push(playerData);
    localStorage.setItem("players", JSON.stringify(listeP));

    alert("Player data saved successfully!");

    // Fermer le modal
    playerModal.classList.add("hidden");
  });
});

// --------------------------- Gestion des Joueurs par Position ---------------------------
document.addEventListener("DOMContentLoaded", () => {
  const playersModal = document.getElementById("playersModal");
  const closePlayersModal = document.getElementById("closePlayersModal");
  const playersContainer = document.getElementById("playersContainer");

  // Gestion des boutons de position (GK, LB, CB, etc.)
  const positionButtons = document.querySelectorAll(
    "button[id='GK'], button[id='LB'], button[id='CBL'], button[id='CBR'], button[id='RB'], button[id='CM'], button[id='CML'], button[id='CMR'], button[id='CF'], button[id='LWF'], button[id='RWF']"
  );

  let selected = null;

  positionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      selected = button.getAttribute("data-num");
      const position = button.id;
      const filteredPlayers = listeP.filter(
        (player) => player.position === position
      );
      renderPlayers(filteredPlayers, position);
      playersModal.classList.remove("hidden");
    });
  });

  // Fermer le modal des joueurs
  closePlayersModal.addEventListener("click", () => {
    playersModal.classList.add("hidden");
  });

  // Fonction pour afficher les joueurs dans le modal
  function renderPlayers(players, position) {
    playersContainer.innerHTML = ""; // Vider le contenu existant

    players.forEach((player) => {
      const playerCard = document.createElement("div");
      playerCard.className = "border rounded-lg shadow p-4 bg-gray-50";
      playerCard.role = player.name;

      playerCard.innerHTML = `
        <div class="flex items-center space-x-4">
          <img src="${player.photo}" alt="${player.name}" class="w-16 h-16 rounded-full object-cover">
          <div>
            <h3 class="font-bold text-lg">${player.name}</h3>
            <p class="text-sm text-gray-500">${player.position} - ${player.club}</p>
          </div>
        </div>
        <div class="mt-3">
          <img src="${player.flag}" alt="${player.nationality}" class="w-8 h-5 inline-block">
          <span class="text-sm font-medium text-gray-700">${player.nationality}</span>
        </div>
        <ul class="mt-2 grid grid-cols-2 gap-2 text-sm">
          <li><strong>Rating:</strong> ${player.rating}</li>
          <li><strong>Pace:</strong> ${player.pace}</li>
          <li><strong>Shooting:</strong> ${player.shooting}</li>
          <li><strong>Passing:</strong> ${player.passing}</li>
          <li><strong>Dribbling:</strong> ${player.dribbling}</li>
          <li><strong>Defending:</strong> ${player.defending}</li>
          <li><strong>Physical:</strong> ${player.physical}</li>
        </ul>
        <div class="flex flex-row justify-between mt-3">
          <button class="bg-red-600 rounded-lg p-2 removeButton">remove</button>
          <button class="bg-green-500 rounded-lg p-2">update</button>
        </div>
      `;

      // Attacher l'événement de suppression au bouton 'remove'
      const removeButton = playerCard.querySelector(".removeButton");
      removeButton.addEventListener("click", function (event) {
        event.stopPropagation(); // Empêche la propagation de l'événement
        playerCard.remove(); // Supprime la carte du joueur (le div parent)

        // Supprimer le joueur de la liste et mettre à jour localStorage
        listeP = listeP.filter((item) => item.name !== player.name);
        localStorage.setItem("players", JSON.stringify(listeP));
      });


      playerCard.addEventListener("click", function () {
        let res = listeP.find((item) => item == player.name);
        const newDiv = document.createElement("div");

        newDiv.className =
          "bg-[url('/images/iconecarte.webp')] bg-cover bg-no-repeat w-40 h-52 mb-12 justify-items-center pl-3 pr-3 pt-7 pb-2";

        const button = document.querySelector(
          'button[data-num="' + selected + '"]'
        );
        button.innerHTML = "";
        newDiv.innerHTML = `
          <div class="flex">
            <div
              class="mr-[-10px] mt-5 text-xl font-bold text-black leading-3"
            >
              <p></p>
              <p class="text-lg">${player.rating}</p>
            </div>
            <img
              class="ml-[-9px] mt-1 mb-[-10px] z-10"
              src="${player.photo}"
              style="
                mask-image: linear-gradient(
                  to top,
                  rgba(0, 0, 0, 0) 0%,
                  rgba(0, 0, 0, 1) 8%
                );
              "
              width="100"
              alt=""
            />
          </div>
          <h1 class="font-bold text-black z-20">${player.name}</h1>
          <div
            class="text-black text-[8px] flex gap-1 font-black justify-items-center"
          >
            <ul>
              <li>PAC</li>
              <li>${player.pace}</li>
            </ul>
            <ul>
              <li>SHO</li>
              <li>${player.shooting}</li>
            </ul>
            <ul>
              <li>PAS</li>
              <li>${player.passing}</li>
            </ul>
            <ul>
              <li>DRI</li>
              <li>${player.dribbling}</li>
            </ul>
            <ul>
              <li>DEF</li>
              <li>${player.defending}</li>
            </ul>
            <ul>
              <li>PHY</li>
              <li>${player.physical}</li>
                  </ul>
                </div>
                <div class="flex gap-3 mt-1">
                  <img
                    src="${player.flag}"
                    width="12"
                    alt=""
                  />
                  <img
                    src="${player.club}"
                    width="12"
                    alt=""
                  />
                </div>
                `;
        button.appendChild(newDiv);
      });

      playersContainer.appendChild(playerCard);
    });
  }
});
