const main = document.querySelector("main");

//variable stockant tous les exercices

let exerciceArray = [
  { pic: 0, min: 1 },
  { pic: 1, min: 1 },
  { pic: 2, min: 1 },
  { pic: 3, min: 1 },
  { pic: 4, min: 1 },
  { pic: 5, min: 1 },
  { pic: 6, min: 1 },
  { pic: 7, min: 1 },
  { pic: 8, min: 1 },
  { pic: 9, min: 1 },
];

//Generateur d'exercice (création de la class qui va être instancié pour lancer la routine)

class exercice {}

//création d'une fonction constructeur (il aura toutes les fonctions utiles au projet)(évite la répétition de la const utils dans lobby,routine et finish)

const utils = {
  pageContent(title, content, btn) {
    document.querySelector("h1").innerHTML = title;
    main.innerHTML = content;
    document.querySelector(".btn-container").innerHTML = btn;
  },
};

//création d'un objet page (parametrage(lobby),routine,terminé)

const page = {
  lobby: function () {
    //création d'une fonction avec un map pour afficher le tableau
    let mapArray = exerciceArray
      .map(
        (exo) =>
          `
        <li>
          <div class="card-header">
            <input type="number" id=${exo.pic} min="1" max="10" value=${exo.min}>
            <span>min</span>
          </div>
          <img src="./img/${exo.pic}.png" />
          <i class="fas fa-arrow-alt-circle-left arrow" data-pic=${exo.pic}></i>
          <i class="fas fa-times-circle deleteBtn" data-pic=${exo.pic}></i>
        </li>
      `
      )
      .join("");

    utils.pageContent(
      "parametrage<i id='reboot'class='fas fa-undo'></i>",
      "<ul>" + mapArray + "</ul>",
      "<button id='start'>Commencer<i class='fa-solid fa-circle-play'></i></button>"
    );
  },

  routine: function () {
    utils.pageContent("routine", "Exercice", null);
  },

  finish: function () {
    utils.pageContent(
      "C'est terminé",
      "<button id='start'>Recommencer</button>",
      "<button id='reboot' class='btn-reboot'>Réinitialiser</button><i class='fa-regular fa-circle-xmark'></i>"
    );
  },
};

page.lobby();

//Création de la logique d'une carte
