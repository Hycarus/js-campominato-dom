"use strict";
campoMinato();

function campoMinato(){
    const NUM_BOMB = 16;
    let score = 0;
    const btn = document.querySelector('button');
    btn.addEventListener('click', function(){
        const selector = parseInt(document.querySelector('select').value);
        // generare tot quadratini
        const wrapper = document.getElementById('wrapper');
        wrapper.innerHTML = '';
        // array bombe
        let bombs = generateBombs(selector);
        // ciclo for per stampare i quadratini
        for(let i = 0; i < selector; i++){
            let box = drawBox(i, selector, bombs);
            wrapper.append(box);
        }
    })
    // disegno un quadrato
    function drawBox(indexBox, numCell, bombs){
        const maxAttempt = numCell - NUM_BOMB;
        const box = document.createElement('div');
        box.classList.add('box');
        box.style.width = `calc(100% / ${Math.sqrt(numCell)})`;
        box.style.height = box.style.width;
        box.innerHTML = indexBox + 1;
        box.style.color = 'white';
        box.addEventListener('click', function boxClick(){
            let msg;
            if(bombs.includes(parseInt(indexBox + 1))){
                console.log('boom');
                this.classList.add('bomb');
                this.innerHTML = '<i class="fa-solid fa-bomb fa-beat"></i>';
                gameOver(bombs);
                msg = `You Lose! Il tuo punteggio è: ${score}`;
            } else{
                this.classList.add('active');
                this.style.color = 'black';
                console.log(indexBox + 1);
                score++;
                if(score === maxAttempt){
                    msg = `You Win! Il tuo punteggio è: ${score}`;
                } else{
                    msg = `Il tuo punteggio è: ${score}`;
                }
            }
            box.removeEventListener('click', boxClick);
        })
        return box;
    }
    // genero le bombe
    function generateBombs(selector){
        const bombsArray = [];
        while(bombsArray.length < NUM_BOMB){
            let bomb = getRndInteger(1, selector);
            console.log(bomb);
            if(!bombsArray.includes(bomb)){
                bombsArray.push(bomb);
            }
        }
        console.log(bombsArray);
        return bombsArray;
    }
    // che succede se si fa gameover
    function gameOver(bombs){
        const arrayBoxBombs = document.getElementsByClassName('box');
        for(let i = 0; i < arrayBoxBombs.length; i++){
            let el = arrayBoxBombs[i];
            if(bombs.includes(parseInt(el.textcontent))){
                el.classList.add('bomb');
                el.style.color('black');
                el.innerHTML = '<i class="fa-solid fa-bomb fa-beat"></i>';
            }
        }
    }
}


