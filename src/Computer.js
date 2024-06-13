import { Ship,
    Cell, 
    Gameboard,
    Player
} from "./Classes";

import {
    player2
} from "./index"

export {
    placeComputerShips
}

const computerShip1 = new Ship(2);
const computerShip2 = new Ship(3);
const computerShip3 = new Ship(3);
const computerShip4 = new Ship(4);
const computerShip5 = new Ship(5);

const computerShips = [
    computerShip1,
    computerShip2,
    computerShip3,
    computerShip4,
    computerShip5
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
    console.log("test1");
    computerShips.forEach(ship => {
        const computerShipOrientation = getRandomShipOrientation();

        let placed = false;
        while (!placed) {
            console.log("test2");
            let x, y;
            if (computerShipOrientation === "horizontal") {
                x = getRandomIntegerInclusive(0, 7 - ship.length - 1);
            } else {
                x = getRandomIntegerInclusive(0, 7);
            }

            if (computerShipOrientation === "vertical") {
                y = getRandomIntegerInclusive(0, 7 - ship.length - 1);
            } else {
                y = getRandomIntegerInclusive(0, 7);
            }

            console.log(`Placing ship at (${x}, ${y}) with orientation ${computerShipOrientation}: ${placed}`);
            placed = player2.gameBoard.placeShip(ship, computerShipOrientation, y, x);
        }
    });
}

function clickRandomButtonOnPlayerGrid() {
    const x = getRandomIntegerInclusive(0, 7);
    const y = getRandomIntegerInclusive(0, 7);

    const cellId = `player1-id${x}${y}`;

    const button = document.getElementById(cellId);

    if (button) {
        button.click();
    } else {
        console.log(`Button with ID${cellId} not found`);
    }
}