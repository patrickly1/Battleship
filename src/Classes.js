export { Ship,
    Cell,
    Gameboard,
    Player
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
        this.ships = [];
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
            if (x + ship.length > this.rows) {
                return false;
            }
            for (let i = 0; i < ship.length; i++) {
                if (this.board[y + i][x].ship) {
                    return false;
                }
                this.board[y + i][x].placeShip(ship);
            }
        } else if (orientation === "horizontal") {
            if (y + ship.length > this.columns) {
                return false;
            }
            for (let j = 0; j < ship.length; j++) {
                if (this.board[y][x + j].ship) {
                    return false;
                }
                this.board[y][x + j].placeShip(ship);
            }
        }
        this.ships.push(ship);
        return true;
    }

    receiveAttack(x, y) {
        if (this.board[y][x]) {
            if (this.board[y][x] && this.board[y][x].hit) {
                return false;
            }
            this.board[y][x].attack();
            return true;
        } 
        return false;
    }

    allShipsSunk() {
        for (let i = 0; i < this.ships.length; i++) {
            if (this.ships[i].isSunk() === false) {
                return false;
            }
        }
        return true;
    }
}

class Player {
    constructor(type) {
        this.type = type; //Human or computer
        this.gameBoard = new Gameboard();
    }

    typeOfPlayer() {
        return this.type;
    }
}