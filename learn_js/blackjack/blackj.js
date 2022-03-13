class Card{
    constructor(suit, face){
        this.isAce = face==="Ace";
        this.value = (typeof face)==='number' ? face : (this.isAce ? 11 : 10);
        this.suit = suit;
    }
}

class Deck{
    constructor(numberOfDecks=1){
        this.deck = [];
        for (let i = 0; i < numberOfDecks; i++) {
            for (let suit of ['Spades', 'Hearts', 'Clubs', 'Dimonds']){
                for (let face of [2,3,4,5,6,7,8,9,10,'Jack','Queen','King','Ace']){
                    this.deck.push(new Card(suit,face));
                }
            }
        }
    }

    takeTop(){
        return this.deck.pop();
    }

    shuffle(){
        this.deck = this.deck.map(card=>({c:card, sort:Math.random()}))
                    .sort((a,b)=>(a.sort-b.sort))
                    .map(({card}) => card);
    }
}

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