// Letters
const Letters = "abcdefghijklmnopqrstuvwxyz";

//Get Array Form Letters

const lettersArray = Array.from(Letters);

// Select Letters Container
let lettersContainer = document.querySelector(".letters");

// Ganerate Letters

lettersArray.forEach((le) => {
  // Create Span
  let span = document.createElement("span");

  // Create Letter Text Node
  let theLetter = document.createTextNode(le);

  // Append The Letter To Span
  span.appendChild(theLetter);

  // Add Class On Span
  span.className = "letter-box";

  // Append Span To The Letters Container
  lettersContainer.appendChild(span);
});

// Object Of Words + Categories
const words = {
  programming: [
    "php",
    "javascript",
    "go",
    "scala",
    "fortran",
    "r",
    "mysql",
    "python",
  ],
  movies: [
    "Prestige",
    "Inception",
    "Parasite",
    "Interstellar",
    "Whiplash",
    "Memento",
    "Coco",
    "Up",
  ],
  people: [
    "Albert Einstein",
    "Hitchcock",
    "Alexander",
    "Cleopatra",
    "Mahatma Ghandi",
  ],
  countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"],
};

let allkey = Object.keys(words);

let randomPropKey = allkey[Math.floor(Math.random() * allkey.length)];

let randomPropName = words[randomPropKey];

document.querySelector(".category span").innerHTML = randomPropKey;

let randomLetter =
  randomPropName[Math.floor(Math.random() * randomPropName.length)];

// Select Letters Guess Element
let letterGuessContainer = document.querySelector(".letters-guess");

//Convert Chosen Word To Arrey
let lettersAndSpace = Array.from(randomLetter.toLowerCase());

//Creats Spand Depened On Word
lettersAndSpace.forEach((letter) => {
  let emptySpan = document.createElement("span");
  if (letter === " ") emptySpan.className = "with-space yes";
  letterGuessContainer.appendChild(emptySpan);
});
// Handle Clicking On Letters
let guessSpans = document.querySelectorAll(".letters-guess span");

// Set Wrong Attempts
let wrongAttempts = 0;

// Select The Draw Element
let theDraw = document.querySelector(".hangman-draw");

document.addEventListener("click", (e) => {
  // Set The Chose Status
  let theStatus = false;
  if (e.target.className === "letter-box") {
    e.target.classList.add("clicked");

    // Get Letter Clicked
    let clickedLetter = e.target.innerHTML.toLowerCase();

    lettersAndSpace.forEach((wordLetter, wIndex) => {
      if (clickedLetter === wordLetter) {
        //Set Status To Correct
        theStatus = true;
        guessSpans.forEach((span, sIndex) => {
          if (wIndex == sIndex) {
            span.innerHTML = clickedLetter;
            span.classList.add("yes");
          }
        });
      }
    });
    // Outside Loop
    //If Letters Is Wrong
    if (theStatus !== true) {
      wrongAttempts++;
      theDraw.classList.add(`wrong-${wrongAttempts}`);
      // Play Fail Sound
      document.getElementById("fail").play();
    } else {
      document.getElementById("success").play();
    }
    endgame();
  }
});

function endgame() {
  //Create Pop Div
  let div;
  let divText;
  if (wrongAttempts == 8) {
    lettersContainer.classList.add("finished");
    divText = document.createTextNode(`Game Over, The Word Is ${randomLetter}`);
    document.getElementById("game-over").play();
    div = document.createElement("div");
    div.appendChild(divText);
    // Add Class On Div
    div.className = "popup-lose";

    // Appen To Body
    document.body.appendChild(div);
  }
  if (
    document.querySelectorAll(".letters-guess span.yes").length ===
    lettersAndSpace.length
  ) {
    document.getElementById("win-audio").play();
    lettersContainer.classList.add("finished");
    divText = document.createTextNode(`You Win, The Word Is ${randomLetter}`);
    div = document.createElement("div");
    div.classList.add("win");
    div.appendChild(divText);
    // Add Class On Div
    div.className = "popup-win";

    // Appen To Body
    document.body.appendChild(div);
  }
}
