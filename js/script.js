"use strict";
campoMinato()
function campoMinato(){
    const btn = document.querySelector('button');
    btn.addEventListener('click', function(){
        const selector = parseInt(document.querySelector('select').value);
        // generare tot quadratini
        const wrapper = document.getElementById('wrapper');
        wrapper.innerHTML = '';
        // ciclo for per stampare i quadratini
        for(let i = 0; i < selector; i++){
            let box = drawBox(i, selector);
            console.log(box);
            wrapper.append(box);
        }
    })
    // disegno un quadrato
    function drawBox(indexBox, numCell){
        const box = document.createElement('div');
        box.classList.add('box');
        box.style.width = `calc(100% / ${Math.sqrt(numCell)})`;
        box.style.height = box.style.width;
        box.innerHTML = indexBox + 1;
        box.style.color = 'white';
        box.addEventListener('click', function(){
            box.classList.add('active');
            box.style.color = 'black';
            console.log(indexBox + 1)
        })
        return box;
    }
}