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

// Seleziona tutti i pulsanti all'interno degli elementi con classe 'diff-select'
const buttons = document.querySelectorAll('.diff-select button');

// Per ogni pulsante, aggiungi un listener per il click
buttons.forEach(function(button) {
  button.addEventListener('click', function() {
    // Inizializza la variabile per la velocità dei bug
    let bugSpeed = 0;

    // Utilizza uno switch statement basato sul testo del pulsante cliccato per impostare la velocità e rimuovere il selettore di difficoltà
    switch (button.innerHTML) {
      case 'Easy':
        bugSpeed = 800;
        resetGameArea();
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
    // Avvia il gioco con la velocità dei bug selezionata
    gameStart(bugSpeed);
  });
});


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
        else {
          score--;
          scoreDisplay.innerText = score;
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
