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
        this.rows = 8;
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
            //Check if ship out of bounds vertically
            if (x + ship.length > this.columns) {
                return false;
            }

            //Check for overlap
            for (let i = 0; i < ship.length; i++) {
                if (y >= this.rows || x + i >= this.columns || this.board[y][x + i].ship) {
                    return false;
                }
            }

            //Place ship if no overlap and in bounds
            for (let i = 0; i < ship.length; i++) {
                this.board[y][x + i].placeShip(ship);
            }    
        } else if (orientation === "horizontal") {
            //Check if ship out of bounds horizontally
            if (y + ship.length > this.rows) {
                return false;
            }

            //Check for overlap
            for (let j = 0; j < ship.length; j++) {
                if (y + j >= this.rows || x >= this.columns || this.board[y + j][x].ship) {
                    return false;
                }
            }
            
            //Place ship if no overlap and in bounds
            for (let j = 0; j < ship.length; j++){
                this.board[y + j][x].placeShip(ship);
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