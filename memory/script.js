const grid = document.querySelector('#grid');
const errorCounter = document.querySelector('#error');

// Array contenente i nomi delle carte
const cards = ['alien', 'bug', 'duck', 'rocket', 'spaceship', 'tiktac'];
// Crea un mazzo di carte duplicando l'array 'cards'
const deck = [...cards, ...cards];

// Variabile per tenere traccia delle carte selezionate
let pick = [];

// Contatore degli errori
let errors = 0;

// Ordina casualmente il mazzo di carte
deck.sort(function() {
    return 0.5 - Math.random();
});

// Ciclo per creare e aggiungere le carte al documento HTML
for (let i = 0; i < deck.length; i++) {
    // Crea un elemento div per rappresentare una carta
    const card = document.createElement('div');

    // Ottieni il nome della carta dal mazzo
    const cardName = deck[i];

    // Aggiungi classi e attributi all'elemento carta
    card.classList.add('card');
    card.setAttribute('data-name', cardName);

    // Aggiungi un listener per gestire il clic sulla carta
    card.addEventListener('click', flipCard);

    // Aggiungi la carta alla griglia nel documento HTML
    grid.appendChild(card);
}

// Inizializza il contatore degli errori nel documento HTML
errorCounter.innerText = errors;

// Funzione chiamata quando una carta viene cliccata
function flipCard(event) {
    const card = event.target;

    // Se la carta è già stata girata, esci dalla funzione
    if (card.classList.contains('flipped')) return;

    // Aggiungi classi alla carta per rappresentare il suo stato girato
    card.classList.add(card.getAttribute('data-name'), 'flipped');

    // Aggiungi la carta alla lista delle carte selezionate
    pick.push(card);
    console.log(pick);

    // Se ci sono due carte selezionate, controlla se corrispondono
    if (pick.length === 2) {
        checkForMatch();
    }
}

// Funzione per controllare se le due carte selezionate corrispondono
function checkForMatch() {
    const card1 = pick[0];
    const card2 = pick[1];
    const card1Name = card1.getAttribute('data-name');
    const card2Name = card2.getAttribute('data-name');

    // Se le carte corrispondono, controlla se il giocatore ha vinto
    if (card1Name === card2Name) {
        checkForWin();
    } else {
        // Se le carte non corrispondono, rimuovi le classi 'flipped' dopo un breve ritardo
        setTimeout(function() {
            card1.classList.remove(card1Name, 'flipped');
            card2.classList.remove(card2Name, 'flipped');
            // Incrementa il contatore degli errori e aggiorna nel documento HTML
            errors++;
            errorCounter.innerText = errors;
        }, 500);
    }

    // Resetta l'array delle carte selezionate
    pick = [];
}

// Funzione per controllare se il giocatore ha vinto
function checkForWin() {
    // Se tutte le carte sono girate, mostra un messaggio di vittoria
    const flippedCards = document.querySelectorAll('.flipped');
    if (flippedCards.length === deck.length) {
        showAlert(`Hai vinto facendo ${errors} errori`);
    }
}