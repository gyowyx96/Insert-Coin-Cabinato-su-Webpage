const celle = document.querySelectorAll('.cella'); //SELETTORE CELLE 

let turn = 0;
const segnoCella = [];

for(let i=0; i < celle.length; i++ ){
    const cella = celle[i]; //ARREY
    
    cella.addEventListener('click', function(){
    
        if(segnoCella[i]) {
            return;
        }
        
        turn++;
       
        let sign; 
        if (turn % 2 === 0 ){
            sign = 'o';
        } else {
            sign = 'x';
        }
        
       cella.innerText = sign;
       segnoCella[i] = sign;
       
       let haswon = vittoria();

       if(haswon){
        showAlert(`${sign} ha vinto!`);
        } else if (turn === 9){
        showAlert('pareggio');
      }

      })

}

function vittoria (){
    const haivinto = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 4, 8],
        [2, 4, 6],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
    ];

    for(let i = 0; i < haivinto.length; i++){
        const combinazione = haivinto[i];

        const a = combinazione [0];
        const b = combinazione [1];
        const c = combinazione [2];

        if(segnoCella[a] && segnoCella[a] === segnoCella[b] && segnoCella[b] === segnoCella[c]){
         return true;
        } 
    }
     
    return false;

}

