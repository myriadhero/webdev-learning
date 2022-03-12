"use strict";

console.log("ima dog");
let countEl = document.getElementById("count-el");
let prevNumsEl = document.getElementById("prev-nums")

function increment() {
    countEl.innerText++;
}

function save() {
    prevNumsEl.innerText = prevNumsEl.innerText === "-" ?
        countEl.innerText :
        prevNumsEl.innerText + ` - ${countEl.innerText}`;
    
    countEl.innerText = 0;
}