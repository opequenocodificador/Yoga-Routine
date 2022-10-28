const main = document.querySelector("main");
const basicAray = [
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

//variable stockant tous les exercices

let exerciceArray = [];

//get stored exercices Array

(() => {
  if (localStorage.exercices) {
  }
})();

//Generateur d'exercice (création de la class qui va être instancié pour lancer la routine)

class exercice {}

//création d'une fonction constructeur (il aura toutes les fonctions utiles au projet)(évite la répétition de la const utils dans lobby,routine et finish)

const utils = {
  pageContent(title, content, btn) {
    document.querySelector("h1").innerHTML = title;
    main.innerHTML = content;
    document.querySelector(".btn-container").innerHTML = btn;
  },
  handleEventMinutes: function () {
    document.querySelectorAll('input[type="number"]').forEach((input) => {
      input.addEventListener("input", (e) => {
        exerciceArray.map((exo) => {
          if (exo.pic == e.target.id) {
            exo.min = parseInt(e.target.value);
            console.log(exerciceArray);
          }
        });
      });
    });
  },
  handleEventArrow: function () {
    document.querySelectorAll(".arrow").forEach((arrow) => {
      arrow.addEventListener("click", (e) => {
        let position = 0;
        exerciceArray.map((exo) => {
          if (exo.pic == e.target.dataset.pic && position !== 0) {
            //intervertir
            [exerciceArray[position], exerciceArray[position - 1]] = [
              exerciceArray[position - 1],
              exerciceArray[position],
            ];
            page.lobby();
          } else {
            position++;
          }
        });
      });
    });
  },
  deleteItem: function () {
    document.querySelectorAll(".deleteBtn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const newArr = exerciceArray.filter(
          (exo) => exo.pic != e.target.dataset.pic
        );
        exerciceArray = newArr;
        page.lobby();
      });
    });
  },
  reboot: function () {
    exerciceArray = basicAray;
    page.lobby();
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
    //fonction pour ajouter les minutes sur les cards
    utils.handleEventMinutes();
    //Fonction pour intervertir les cards
    utils.handleEventArrow();
    utils.deleteItem();
    reboot.addEventListener("click", () => utils.reboot());
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
