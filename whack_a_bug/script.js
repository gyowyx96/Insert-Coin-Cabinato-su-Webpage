// Inseriamo il punteggio iniziale
const scoreDisplay = document.querySelector('#score-display');
let score = 0;
scoreDisplay.innerText = score;

// Inseriamo il timer iniziale
const timerDisplay = document.querySelector('#timer-display');
let timeLeft = 30;
timerDisplay.innerText = timeLeft;



// Diamo un valore di velocità iniziale
const gameArea = document.querySelector('.game-area');
const initialState = gameArea.innerHTML;

  const riquadroDiScelta =`
  <div class="diff-select">
    <div class="easy"><button type="button">Easy</button></div>
    <div class="medium"><button type="button">Medium</button></div>
    <div class="hard"><button type="button">Hard</button></div>
  </div>
`
gameArea.innerHTML = gameArea.innerHTML + riquadroDiScelta;

const buttons = document.querySelectorAll('.diff-select button');
buttons.forEach(function(button){
  button.addEventListener('click', function(){
    let bugSpeed = 0;
    switch(button.innerHTML){
      case 'Easy':
        resetGameArea();
        bugSpeed = 800;
        break;
      case 'Medium':
        bugSpeed = 600; 
        resetGameArea();
        break;
      case 'Hard':
        bugSpeed = 500;
        resetGameArea();
        break;
    }
    console.log(bugSpeed);
    gameStart(bugSpeed);
  })
}) 


function resetGameArea(){
  gameArea.innerHTML = initialState;
}
function gameStart(bugSpeed){
  // Inseriamo il bug in una cella via JS
  const cells = document.querySelectorAll('.cell');
  // Logica per randomizzare i bug in una cella 
    function randomBug() {
      // pulisco tutte le celle prima di randomizzarne un'altra
      removeBug();
      // randomizzo una cella a caso
      const randomNumber = Math.floor(Math.random() * cells.length);
      const cell = cells[randomNumber];
      cell.classList.add('bug');
    }

    let bugMovement = setInterval(randomBug, bugSpeed);
    
    function removeBug(){
      for (let i = 0; i < cells.length; i++){
        const cellToClean = cells[i];
        cellToClean.classList.remove('bug');
      }
    }

    // Diamo modo all'utente di colpire il bug!

    for(let i = 0; i < cells.length; i++){
      const cell = cells[i];
      cell.addEventListener('click', function(){
        // se tra le classi della cella cliccata c'è la classe bug
        if(cell.classList.contains('bug')){
          // incremento il punteggio e lo stampo
          score++; 
          scoreDisplay.innerText = score;

          cell.classList.remove('bug');
          cell.classList.add('splat');

          // puliamo la cella dallo splat!
          setTimeout(function(){
            cell.classList.remove('splat');
          }, 100);
        }
      })
    }

    // impostiamo un conto alla rovescia
    const timer = setInterval(countDown, 1000);

    function countDown() {
      timeLeft--;
      timerDisplay.innerText = timeLeft;

      if(timeLeft === 0){
        clearInterval(timer);
        clearInterval(bugMovement);
        removeBug();

        showAlert(`GAME OVER! Punti: ${score}`);
      }
    }
}
