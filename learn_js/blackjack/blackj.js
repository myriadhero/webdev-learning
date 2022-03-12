

let startBtn = document.getElementById("start-btn");
let cardsElem = document.getElementById("cards");
let sumElem = document.getElementById("sum");

startBtn.onclick = gameRound2Cards;

function gameRound2Cards(){
    let firstCard,secondCard;
    let isAlive = true;

    firstCard = dealOne(); 
    secondCard = dealOne();
    cardsElem.innerText = `Cards: `;
    let sum = firstCard+secondCard;

    let hasBlackJ = sum===21;

}


function dealOne(){
    return Math.round(Math.random()*9)+2;
}