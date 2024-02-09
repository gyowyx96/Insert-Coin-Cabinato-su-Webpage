// Seleziona tutte le celle del gioco e le assegna alla variabile "cells"
const cells = document.querySelectorAll('.cell');

// Variabile per tener traccia del turno attuale 
let turn = 0;

// Array per memorizzare i segni ('X' o 'O') associati a ciascuna cella
const cellSigns = [];

// Itera su tutte le celle del gioco
for (let i = 0; i < cells.length; i++) {
  const cell = cells[i];

  // Aggiunge un listener per l'evento di click su ogni cella
  cell.addEventListener('click', function () {

    // Se la cella è già stata cliccata, esce dalla funzione
    if (cellSigns[i]) {
      return;
    }

    // Incrementa il turno
    turn++;

    // Determina il segno in base al turno attuale
    let sign;
    if (turn % 2 === 0) {
      sign = 'O';
    } else {
      sign = 'X';
    }

    // Assegna il segno alla cella e lo memorizza nell'array
    cell.innerText = sign;
    cellSigns[i] = sign;

    // Controlla se c'è una vittoria
    let hasWon = checkVictory();

    // Mostra un messaggio se c'è una vittoria o se il gioco è un pareggio
    if (hasWon) {
      showAlert(`${sign} Ha vinto!`);
    } else if (turn === 9) {
      showAlert('Pareggio');
    }
  });
}

// Funzione per controllare se c'è una vittoria
function checkVictory() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // Itera sulle combinazioni vincenti
  for (let i = 0; i < winningCombinations.length; i++) {
    const combination = winningCombinations[i];

    const a = combination[0];
    const b = combination[1];
    const c = combination[2];

    // Controlla se i segni nelle celle corrispondono a una combinazione vincente
    if (cellSigns[a] && cellSigns[a] === cellSigns[b] && cellSigns[b] === cellSigns[c]) {
      return true; // Ritorna true se c'è una vittoria
    }
  }

  return false; // Ritorna false se non c'è una vittoria
}


