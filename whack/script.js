const cells = document.querySelectorAll('.cell');
let speed = 500;
const tempoId = document.getElementById('time-display');
const puntiId = document.getElementById('score-display');

let tempo = 30;
let punti = 0;

tempoId.innerText = tempo;
puntiId.innerText = punti;
 

//mettiamo il bug
function drawBug(){

    removeBug();

    if(tempo === 20){
        speed = speed - 100;
    }
        
        const randomNumber = Math.floor(Math.random() * cells.length);
        const cell = cells[randomNumber];
        cell.classList.add('bug');

}

function removeBug(){
    for(let i =0; i<cells.length; i++){
        const cellToClean = cells[i];
        cellToClean.classList.remove('bug');
    }
    
}
const bugMovement = setInterval(drawBug, speed);





//colpiamo 
for(let i = 0; i<cells.length; i++){
    const cell = cells[i];
    cell.addEventListener('click', function(){
        if(cell.classList.contains('bug')){
            cell.classList.remove('bug');
            cell.classList.add('splat');
            punti++;
            puntiId.innerText= punti;

            setTimeout(function(){
                cell.classList.remove('splat');  
            }, 200);
        }

    })
    
}

const timer = setInterval(countdown, 1000);

function countdown() {
    tempo--;
    tempoId.innerText= tempo;

    if(tempo=== 0){
        clearInterval(bugMovement);
        clearInterval(timer);
        removeBug();

        showAlert(`tempo finito hai fatto:${punti} punti!`);
    }
    
}
 

