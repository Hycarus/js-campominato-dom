"use strict";
campoMinato();

function campoMinato(){
    const NUM_BOMB = 16;
    let score = 0;
    const btn = document.getElementById('start');
    const btnReset = document.getElementById('reset');
    const option = document.getElementById('select');
    let remind = false;
    let scoreEl = document.getElementById('score');
    let bombAudio = new Audio('../audio/explosion.mp3');
    let bombs;
    let selector;
    let box;
    let activeBox;
    btn.addEventListener('click', function(){
        selector = parseInt(document.querySelector('select').value);
        // generare tot quadratini
        const wrapper = document.getElementById('wrapper');
        let scoreEl = document.getElementById('score');
        score = 0;
        scoreEl.innerHTML = '';
        wrapper.innerHTML = '';
        // array bombe
        bombs = generateBombs();
        // ciclo for per stampare i quadratini
        for(let i = 0; i < selector; i++){
            box = drawBox(i);
            wrapper.append(box);
        }
    });
    btnReset.addEventListener('click', function(){
        score = 0;
        scoreEl.innerHTML = `Il tuo punteggio è: ${score}`;
        wrapper.innerHTML = '';
        remind = false;
        btnReset.classList.add('d-none');
        btn.classList.remove('d-none');
        option.classList.remove('d-none');
    });
    // disegno un quadrato
    function drawBox(indexBox){
        const maxAttempt = selector - NUM_BOMB;
        const box = document.createElement('div');
        box.classList.add('box');
        box.style.width = `calc(100% / ${Math.sqrt(selector)})`;
        box.style.height = box.style.width;
        box.innerHTML = indexBox + 1;
        box.style.color = 'white';
        box.addEventListener('click', function boxClick(){
            if(remind === false){
                if(bombs.includes(parseInt(indexBox + 1))){
                    this.classList.add('bomb');
                    this.innerHTML = '<i class="fa-solid fa-bomb fa-beat"></i>';
                    gameOver();
                    bombAudio.play();
                    remind = true;
                    scoreEl.innerHTML = `You Lose! Il tuo punteggio è: ${score}`;
                } else{
                    this.classList.add('active');
                    this.style.color = 'black';
                    console.log(indexBox + 1);
                    score++;
                    checker(box);
                    if(score === maxAttempt){
                        gameOver();
                        remind = true;
                        scoreEl.innerHTML = `You Win! Il tuo punteggio è: ${score}`;
                    } else{
                        scoreEl.innerHTML = `Il tuo punteggio è: ${score}`;
                    }
                }
            } else{
                box.removeEventListener('click', boxClick);
            }
            box.removeEventListener('click', boxClick);
        });
        return box;
    };
    // genero le bombe
    function generateBombs(){
        const bombsArray = [];
        while(bombsArray.length < NUM_BOMB){
            let bomb = getRndInteger(1, selector);
            console.log(bomb);
            if(!bombsArray.includes(bomb)){
                bombsArray.push(bomb);
            }
        }
        console.log(bombsArray.sort());
        return bombsArray;
    };
    // che succede se si fa gameover
    function gameOver(){
        const arrayBoxBombs = document.getElementsByClassName('box');
        for(let i = 0; i < arrayBoxBombs.length; i++){
            let el = arrayBoxBombs[i];
            if(bombs.includes(parseInt(el.innerHTML))){
                el.classList.add('bomb');
                el.style.color = 'black';
                el.innerHTML = '<i class="fa-solid fa-bomb fa-beat"></i>';
                btnReset.classList.remove('d-none');
                btn.classList.add('d-none');
                option.classList.add('d-none');
            }
        }
    };

    function checker(box){
        activeBox = document.getElementsByClassName('box');
        let nearArray = [];
        let y = parseInt(box.innerHTML);
        console.log(y);
        let radice = parseInt(Math.sqrt(selector));
        let down = y + radice;
        let up = y - radice;
        let left = y - 1;
        let right = y + 1;
        let bombNumber = 0;
        if(y / selector === 1){
            nearArray.push(up, left);
            for(let i = 0; i < nearArray.length; i++){
                if(bombs.includes(nearArray[i])){
                    bombNumber++;
                }
            }
            console.log('sei nei primo')
        } else if(y / radice === 1){
            nearArray.push(down, left);
            for(let i = 0; i < nearArray.length; i++){
                if(bombs.includes(nearArray[i])){
                    bombNumber++;
                }
            }
            console.log('sei nei secondo')
        } else if(y * 1 === 1){
            nearArray.push(down, right);
            for(let i = 0; i < nearArray.length; i++){
                if(bombs.includes(nearArray[i])){
                    bombNumber++;
                }
            }
            console.log('sei nei terzo')
        } else if((y + (radice - 1))/ selector === 1){
            nearArray.push(up, right);
            for(let i = 0; i < nearArray.length; i++){
                if(bombs.includes(nearArray[i])){
                    bombNumber++;
                }
            }
            console.log('sei nei quarto')
        } else if(y < radice){
            nearArray.push(down, left, right);
            for(let i = 0; i < nearArray.length; i++){
                if(bombs.includes(nearArray[i])){
                    bombNumber++;
                }
            }
            console.log('sei nei quinto')
        } else if(y > (selector - radice)){
            nearArray.push(up, left, right);
            for(let i = 0; i < nearArray.length; i++){
                if(bombs.includes(nearArray[i])){
                    bombNumber++;
                }
            }
            console.log('sei nei sesto')
        } else if ((y - 1) % radice === 0){
            nearArray.push(up, down, right);
            for(let i = 0; i < nearArray.length; i++){
                if(bombs.includes(nearArray[i])){
                    bombNumber++;
                }
            }
            console.log('sei nei settimo')
        } else if (y % radice === 0){
            nearArray.push(up, down, left);
            for(let i = 0; i < nearArray.length; i++){
                if(bombs.includes(nearArray[i])){
                    bombNumber++;
                }
            }
            box.innerHTML = bombNumber;
        } else{
            nearArray.push(up, down, left, right);
            for(let i = 0; i < nearArray.length; i++){
                if(bombs.includes(nearArray[i])){
                    console.log('you did it bro');
                    bombNumber++;
                }
            }
            console.log('sei nell ottavo');
            console.log(nearArray);
        }
        box.innerHTML = bombNumber;
        box.classList.add('fw-bold');
        box.classList.add('fs-5');
        if(bombNumber === 4){
            box.style.color = 'black';
        } else if(bombNumber === 3){
            box.style.color = 'red';
        } else if(bombNumber === 2){
            box.style.color = 'orange';
        } else if( bombNumber === 1){
            box.style.color = 'yellow';
        } else{
            box.style.color = 'green';
        }
    }
};


