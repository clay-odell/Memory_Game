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
  const click = event.target; 
  const color = click.className;

  if (!firstCard) { 
    firstCard = click;
    click.style.backgroundColor = color;
  } else if (!secondCard) { 
    secondCard = click;
    click.style.backgroundColor = color;
    
    if (firstCard.className === secondCard.className && firstCard !== secondCard) {
      console.log('Match found!');
      score++;
      document.getElementById('scoreboard').textContent = 'Score: ' + (score * 500);
      document.getElementById('score');
      firstCard = null;
      secondCard = null;

      
      const allMatchesMade = Array.from(gameContainer.children).every(
        (child) => child.style.backgroundColor !== ''
      );

      if (allMatchesMade) {
        document.getElementById('reset-button').style.display = 'block';
      }
    } else {
      console.log('No match.');
        setTimeout(() => { 
        firstCard.style.backgroundColor = '';
        secondCard.style.backgroundColor = '';
        firstCard = null;
        secondCard = null;
      }, 1000); 
    }
  }
};
function resetGame() {
  
  score = 0;
  document.getElementById('scoreboard').textContent = 'Score: ' + score;
  while (gameContainer.firstChild) {
    gameContainer.removeChild(gameContainer.firstChild);
  }

  
  shuffledColors = shuffle(COLORS);
  createDivsForColors(shuffledColors);

 
  document.querySelector('#reset-button').style.display = 'none';
}
const resetButton = document.querySelector('#reset-button');
resetButton.addEventListener('click', resetGame);

startButton = document.querySelector('#start-button');
startButton.addEventListener('click', function()
{
  gameContainer.style.visibility = "visible";
  this.style.display = "none";
});


createDivsForColors(shuffledColors);
console.log(gameBoard);