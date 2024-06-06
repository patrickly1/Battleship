export { Ship,
    Cell,
    Gameboard
 }

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
        this.hit = false;
        this.ship = null;
    }

    placeShip(ship) {
        this.ship = ship;
    }

    attack() {
        this.hit = true;
        if (this.ship) {
            this.ship.attacked();
        }
    }
}

class Gameboard {
    constructor() {
        this.rows = 7;
        this.columns = 8;
        this.board = this.generateBoard();
    }

    generateBoard() {
        let board = []
        for (let i = 0; i < this.rows; i++) {
            board[i] = [];
            for (let j = 0; j < this.columns; j++) {
                board[i].push(new Cell());
            }
        }
        return board;
    }

    placeShip(ship, orientation, x, y) {
        if (orientation === "vertical") {
            if (y + ship.length > this.rows) {
                return false
            }
            for (let i = 0; i < ship.length; i++) {
                this.board[y + i][x].placeShip(ship);
            }
        }
        if (orientation === "horizontal") {
            if (x + ship.length > this.columns) {
                return false;
            }
            for (let j = 0; j < ship.length; j++) {
                this.board[y][x + j].placeShip(ship);
            }
        }
    }
}