let sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function runGens(evolver, numberOfGens){
    if (numberOfGens===-1){
        while(1){
            await sleep(SLEEPMS);
            evolver.evolve();
        }
    } else {
        for (let i = 0; i<numberOfGens; i++){
            await sleep(SLEEPMS);
            evolver.evolve();
        }
    }
}

function makeSingleRect(x,y){
    return `<rect id="${x}-${y}" class="dead" x="${x}" y="${y}" width="1" height="1"></rect>`;
}

function makeFullRect(width,height){
    let rects = [];
    for (let j = 0; j < height; j++) {
        for (let i = 0; i < width; i++){
            rects.push(makeSingleRect(i,j));
        }
    }

    return `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs></defs>
    ${rects.join("\n")}
    </svg>`;
}


class Cell{
    constructor(x, y){
        this.x=x;
        this.y=y;
        this.elem = document.getElementById(`${x}-${y}`);
    }
    get isAlive(){
        return this._isAlive;
    }
    set isAlive(nextState){
        if (this._isAlive && nextState){
            this.elem.setAttribute("class", "thriving");
        } else if (!(this._isAlive || nextState)){
            this.elem.setAttribute("class", "longdead");
        } else {
            this._isAlive = nextState;
            this.elem.setAttribute("class", nextState ? "alive" : "dead");
        }
    }
}

class Evolver{
    constructor(width, height, states=false, chanceToSpawn=0.001){
        this.height = height;
        this.width = width;
        this.chanceToSpawn = chanceToSpawn;
        this.currentStates = states || this.makeRandomInitialStates();
        this.allCells = this.getCellElems();
        this.renderCells();
        this.nextStates = this.nextGen();
    }

    evolve(){
        this.currentStates = this.nextStates;
        this.renderCells();
        this.nextStates = this.nextGen();
        return this.currentStates;
    }

    renderCells(){
        for (let cell of this.allCells){
            cell.isAlive = this.currentStates[cell.y][cell.x];
        }
    }

    nextGen(){
        let nextStates = [];
        for (let j = 0; j < this.height; j++){
            nextStates.push([]);
            for (let i = 0; i < this.width; i++){
                nextStates[j].push(this.evolveOne(j,i));
            }
        }
        return nextStates;
    }

    evolveOne(y,x){
        let aliveTotal = this.getNeighbours(x,y);
        if ((aliveTotal === 2 && this.currentStates[y][x]) || (aliveTotal === 3)) {
            return true;
        }
        return Math.random() > this.chanceToSpawn ? false : true;
    }

    getNeighbours(x,y){
        let aliveTotal = 0;
        for (let j = y-1; j < y+2; j++) {
            if (j<0 || j>=this.height) continue;

            for (let i = x-1; i < x+2; i++){
                if ((i<0 || i>=this.width) || ((x==i) && (y==j))) continue;

                aliveTotal += this.currentStates[j][i];
            }
        }
        return aliveTotal;
    }

    makeRandomInitialStates(){
        let states = [];
        for (let j = 0; j < this.height; j++){
            states.push([]);
            for (let i = 0; i < this.width; i++){
                states[j].push(Math.random()>0.5);
            }
        }
        return states;
    }

    getCellElems(){
        let rectElems = [];
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++){
                rectElems.push(new Cell(x,y));
            }
        }
        return rectElems;
    }
}

function runGame(){
    let widthElem = document.getElementById("width");
    let heightElem = document.getElementById("height");
    let cyclesElem = document.getElementById("cycles");

    let wrapperEl = document.getElementById("wrapper");
    const [width, height] = [widthElem.value,heightElem.value];
    wrapperEl.innerHTML = makeFullRect(width,height);
    const evolver = new Evolver(width, height);
    runGens(evolver, parseInt(cyclesElem.value));

    document.getElementById("controls").style.opacity = "30%";
    document.getElementById("instructions").style.display = "none";
}


let SLEEPMS = 1000;
document.getElementById("run-btn").onclick = runGame;