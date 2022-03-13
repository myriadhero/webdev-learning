class Card{
    constructor(suit, face){
        this.isAce = face==="Ace";
        this.face = face;
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
        this.deck = this.deck.map(card=>({card, sort:Math.random()}))
                    .sort((a,b)=>(a.sort-b.sort))
                    .map(({card}) => card);
    }
}

let startWrapper = document.getElementById("start-wrapper");
let messageElem = document.getElementById("message");
let startBtn = document.getElementById("start-btn");

let gameWrapper = document.getElementById("game-wrapper");
let dCardsElem = document.getElementById("dcards");
let dPointsElem = document.getElementById("dpoints");
let pCardsElem = document.getElementById("pcards");
let pPointsElem = document.getElementById("ppoints");
let hitBtn = document.getElementById("hit-btn");
let standBtn = document.getElementById("stand-btn");

startBtn.onclick = startGame;
hitBtn.onclick = hit;
standBtn.onclick = stand;

let deck;
let dcards, dpoints, pcards, ppoints;

function startGame(){
    startWrapper.style.display = "none";
    gameWrapper.style.display = 'block';
    deck = new Deck;
    deck.shuffle();
    // deal player
    pcards = [deck.takeTop(), deck.takeTop()];
    // deal dealer
    dcards = [deck.takeTop(), deck.takeTop()];

    // calc points
    dpoints = calcPoints([dcards[0]]);
    ppoints = calcPoints(pcards);

    dPointsElem.innerText = `Dealer Points: ${dpoints}*`;
    pPointsElem.innerText = `Player Points: ${ppoints}`;
    
    pCardsElem.innerText = `Player cards: ${stringCards(pcards)}`;
    dCardsElem.innerText = `Dealer cards: ${stringCards([dcards[0]])}, *`;
    
    dpoints = calcPoints(dcards);
    if (dpoints === 21 ){
        ppoints === 21 ? draw() : dealerWon();
    }
    checkPlayerScore();


}

function calcPoints(cards){
    let total = 0;
    for (let card of cards){
        // naive first ace is 11 others 1
        if (!card.isAce){
            total += card.value;
        }
        else if (total+11>21){
            total+=1;
        }
        else{
            total+=11;
        }
    }
    return total;
}

function stringCards(cards){
    return cards.map(card=>card.face+" of "+card.suit).join(", ");
}

function hit(){
    pcards.push(deck.takeTop());
    ppoints = calcPoints(pcards);
    pPointsElem.innerText = `Player Points: ${ppoints}`;
    pCardsElem.innerText = `Player cards: ${stringCards(pcards)}`;
    checkPlayerScore();
}

function stand(){
    // hitBtn.disabled = true;
    // standBtn.disabled = true;

    while (dpoints<17){
        dcards.push(deck.takeTop());
        dpoints = calcPoints(dcards);
    }
    dPointsElem.innerText = `Dealer Points: ${dpoints}`;
    dCardsElem.innerText = `Dealer cards: ${stringCards(dcards)}`;
    checkDealerScore();
}

function checkPlayerScore(){
    ppoints = calcPoints(pcards);
    if (ppoints===21) {
        playerWon();
        reset();
    }
    else if (ppoints>21){
        playerBust();
        reset();
    }
}

function checkDealerScore(){
    if (dpoints>21){
        dealerBust();
    }
    else {
        ppoints>dpoints ? playerWon() : (ppoints===dpoints ? draw() : dealerWon());
    }
    reset();
}

function playerWon(){
    alert("player won");
}

function playerBust(){
    alert("player bust");
}

function dealerWon(){
    alert("dealer won");
}

function dealerBust(){
    alert("dealer bust");
}

function draw(){
    alert("draw!");
}

function showModal(){
    
}

function reset(){
    messageElem.innerText = 'Play another?';

    startWrapper.style.display = "block";
    gameWrapper.style.display = 'none';


}