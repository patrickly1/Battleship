import { Ship,
    Cell, 
    Gameboard,
    Player
} from "./Classes";

import {
    getCellCoordinates,
    player1,
    player2
} from "./index"

import {
    updateSunkShipClass,
    gameOverDOM
} from "./DOM"

export {
    computerTurntoAttack,
    placeComputerShips
}

const computerShips = [
    new Ship(2),
    new Ship(3),
    new Ship(3),
    new Ship(4),
    new Ship(5)
]

function getRandomIntegerInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min; 
}

function getRandomShipOrientation() {
    if (getRandomIntegerInclusive(0, 1) === 0) {
        return "horizontal";
    } else {
        return "vertical";
    }
}

function placeComputerShips() {
    computerShips.forEach(ship => {
        const computerShipOrientation = getRandomShipOrientation();

        let placed = false;
        while (!placed) {
            let x, y;
            if (computerShipOrientation === "horizontal") {
                x = getRandomIntegerInclusive(0, 7 - ship.length);
            } else {
                x = getRandomIntegerInclusive(0, 7);
            }

            if (computerShipOrientation === "vertical") {
                y = getRandomIntegerInclusive(0, 7 - ship.length);
            } else {
                y = getRandomIntegerInclusive(0, 7);
            }

            console.log(`Placing ship at (${x}, ${y}) with orientation ${computerShipOrientation}: ${placed}`);
            placed = player2.gameBoard.placeShip(ship, computerShipOrientation, y, x);
        }
    });
}

function computerTurntoAttack() {
    const player1GridContainer = document.getElementById("player1GridContainer");
    const validCells = [];
    let lastSuccessfulHit = null;

    //Valid non-attacked cells
    const cells = player1GridContainer.querySelectorAll("button");
    cells.forEach(cell => {
        if (!cell.classList.contains("hit")) {
            validCells.push(cell);
        }
    })

    if (validCells.length === 0) {
        console.log("No valid cells left for computer to attack");
    }
    
    let cell, x, y;
    
    //If last hit was successful, hit adjacent cells
    if (lastSuccessfulHit) {
        //code to target adjacent cells here
    } else {
        //Randomly select a cell to attack
        const randomIndex = Math.floor(Math.random() * validCells.length);
        cell = validCells[randomIndex];
        [x, y] = getCellCoordinates(cell.id);      
    }

    player1.gameBoard.receiveAttack(x, y);
    cell.classList.add("hit");

    const attackedCell = player1.gameBoard.board[y][x];
    if (attackedCell.ship) {
        cell.classList.add("hit-ship");
        let lastSuccessfulHit = [x, y];
        if (attackedCell.ship.isSunk()) {
            updateSunkShipClass(player1, attackedCell.ship, "Player1");
        }
    } 

    //Check win condition
    if (player1.gameBoard.allShipsSunk()) {
        gameOverDOM("computer");
        console.log("computer", "game over");
    }
}
