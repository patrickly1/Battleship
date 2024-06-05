export { Ship }

class Ship {
    constructor(length) {
        this.length = length;
        this.hit = 0;
        this.sunk = false;
    }

    attacked() {
        this.hit++;
        if (this.hit >= this.length) {
            this.sunk = true;
        }
    }   

    isSunk() {
        return this.sunk;
    }
}

class Cell {
    constructor() {

    }
}

class Gameboard {
    
}