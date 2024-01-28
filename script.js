const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];


function shuffle(array) {
  let counter = array.length;

  
  while (counter > 0) {
    
    let index = Math.floor(Math.random() * counter);

    
    counter--;

    
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);


function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    
    const newDiv = document.createElement("div");

    
    newDiv.classList.add(color);

    
    newDiv.addEventListener("click", handleCardClick);

   
    gameContainer.append(newDiv);
  }
}

let firstCard = null;
let secondCard = null;
let score = 0;
function handleCardClick(event) {
  console.log("you just clicked", event.target);
  if (firstCard && secondCard) 
  {
    return;
  }
  const click = event.target; //gets the clicked element and stores it as a variable.
  const color = click.className;// stores the color of the clicked element as a variable.

  if (!firstCard) { //if the first card hasn't been clicked yet then set it to the clicked element.
    firstCard = click;
    click.style.backgroundColor = color;// sets the color of the clicked element to the color of the clicked div element..
  } else if (!secondCard) { //if the second card hasn't been clicked yet then set it to the clicked element.
    secondCard = click;
    click.style.backgroundColor = color;
    //if the first card and the 2nd card are the same then the cards are matched and stay flipped over.
    if (firstCard.className === secondCard.className && firstCard !== secondCard) {
      console.log('Match found!');//console logs that a Match found!
      score++;
      document.getElementById('scoreboard').textContent = 'Score: ' + (score * 500);
      document.getElementById('score');
      firstCard = null; //resets the first card value to null so that the user can keep playing.
      secondCard = null;//reseets the 2nd card value to null so that the user can keep playing..

      // Check if all matches have been made
      const allMatchesMade = Array.from(gameContainer.children).every(
        (child) => child.style.backgroundColor !== ''
      );

      if (allMatchesMade) {
        document.getElementById('reset-button').style.display = 'block';
      }
    } else {
      console.log('No match.');
        setTimeout(() => { //after 1 seconds the cards are flipped back over, to return everything back to their original state.
        firstCard.style.backgroundColor = '';
        secondCard.style.backgroundColor = '';
        firstCard = null;//resets the first card value to null so that the user can keep playing.
        secondCard = null;//resets the 2nd card value to null so that the user can keep playing.
      }, 1000); // Wait 1 second before flipping the cards back over
    }
  }
};
function resetGame() {
  // Clear the game container
  score = 0;
  document.getElementById('scoreboard').textContent = 'Score: ' + score;
  while (gameContainer.firstChild) {
    gameContainer.removeChild(gameContainer.firstChild);
  }

  // Shuffle the colors and recreate the game board
  shuffledColors = shuffle(COLORS);
  createDivsForColors(shuffledColors);

  // Hide the reset button
  document.querySelector('#reset-button').style.display = 'none';
}
const resetButton = document.querySelector('#reset-button');//creates a variable for the resetButton
resetButton.addEventListener('click', resetGame);//creates an event listener for the resetButton

startButton = document.querySelector('#start-button');//creates a variable for the startButton
startButton.addEventListener('click', function()
{
  gameContainer.style.visibility = "visible";
  this.style.display = "none";
});//creates an event listener for the startButton


createDivsForColors(shuffledColors);
console.log(gameBoard);