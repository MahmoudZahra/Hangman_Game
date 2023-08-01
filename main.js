const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

//Get array from letters
let letterArray = Array.from(letters);

//Select letters Container
let lettersContainer = document.querySelector(".letters");

letterArray.forEach(letter => {
  let span = document.createElement("span");

  let theLetter = document.createTextNode(letter);

  span.appendChild(theLetter);

  span.className = 'letter-box';

  lettersContainer.appendChild(span);
})

// Object of words and Categories

const words = {
  Programming: ["JavaScript", "PHP", "C#", "SQL", "Python"],
  anime: ["Naroto", "One piece", "Death Note", "Attach on Titans"],
  countries: ["United States", "Canada", "Egypt", "hinid"],
  company: ["facebook", "twitter", "instagram", "Whatsapp",]
}

let allKeys = Object.keys(words);

// Get Random key 
let randomKeys = Math.floor(Math.random() * allKeys.length);

//Get Random name depending on Random Key
let randomName = allKeys[randomKeys];

// Get Random Value depending on Random Name key
let randomValue = words[randomName];

// Get Random Value name 
let randomValueName = Math.floor(Math.random() * randomValue.length);

let nameWord = randomValue[randomValueName].toLowerCase();

document.querySelector(".game-info .category span").innerHTML = randomName;


// Guess the Letters

let LetterGuessContainer = document.querySelector(".letters-guess");

//Convert letters to array
let LetterAndSpace = Array.from(nameWord);


LetterAndSpace.forEach(character => {
  //Create empty span 

  let emptySpan = document.createElement("span");

  // if letter has spaces
  if (character === ' ') {
    emptySpan.className = 'with-space';
  }

  LetterGuessContainer.appendChild(emptySpan);
});

/*----------------------------------------------------*/

// Select Spans 

let guessSpans = document.querySelectorAll(".letters-guess span");

/*----------------------------------------------------*/
// Set Wrong Attempts 
let wrongAttempts = 0;

// Select the correct letter
let correctWords = 0;

/*----------------------------------------------------*/


//Select the draw Elements
let theDraw = document.querySelector(".hangman-draw");


//Get character that I clicked

document.addEventListener("click", (e) => {

  // the chose statues
  let theStatus = false;

  if (e.target.className === 'letter-box') {

    e.target.classList.add("clicked");

    // Get Clicked character
    let theClickedCharacter = e.target.innerHTML.toLowerCase();

    LetterAndSpace.forEach((characterword, wordIndex) => {

      if (characterword == theClickedCharacter) {
        correctWords++;
        //Set Status correct
        theStatus = true;

        //Loop on All guess spans 
        guessSpans.forEach((span, spanIndex) => {
          if (wordIndex === spanIndex) {
            span.innerHTML = theClickedCharacter;

          }
        });
      }
    });

    if (theStatus !== true) {
      wrongAttempts++;

      theDraw.classList.add(`wrong-${wrongAttempts}`);

      //play fail sound
      document.getElementById("fail").play();

      if (wrongAttempts === 8) {
        lettersContainer.classList.add("finished");

        endGame();
      }

    } else {
      document.getElementById("success").play();
      if (correctWords === LetterAndSpace.filter(character => character !== ' ').length) {
        lettersContainer.classList.add("finished");
        successGame();
      }

    }
  }

});


// End Game

function endGame() {

  let div = document.createElement("div");

  let divText = document.createTextNode(`Game Over 😞 , The Word is : ${nameWord}`);


  div.appendChild(divText);

  div.className = "popup1";

  document.body.appendChild(div);
}
function successGame() {

  let div = document.createElement("div");

  let divText = document.createTextNode(`Great Job 💪 , Correct Answer`);


  div.appendChild(divText);

  div.className = "popup2";

  document.body.appendChild(div);
}