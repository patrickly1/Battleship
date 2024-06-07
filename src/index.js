import _ from "lodash";
import "./style.css";
import { Ship,
    Cell, 
    Gameboard,
    Player
 } from "./Classes";

import {
    toggleComputer
} from "./DOM"

let player1 = new Player("player");
//togglleComputer currently set to player
console.log("Start at player1");
let player2 = new Player(toggleComputer());

const player1GridContainer = document.getElementById("player1GridContainer")
const player2GridContainer = document.getElementById("player2GridContainer")

//create Grid
function createGrid(player) {
    let playersGameBoard = player.gameBoard;
    for (let i = 0; i < playersGameBoard.rows; i++){
        for (let j = 0; j < playersGameBoard.columns; j++) {
            const button = document.createElement("button");
            button.id = `id${i}${j}`;
            
            button.addEventListener("click",() => {
                //add function here
                console.log(`Button clicked: Cell ${i}${j}`);
            })

            if (player === player1) {
                player1GridContainer.appendChild(button);
            } else if (player === player2) {
                player2GridContainer.appendChild(button);
            }
        }
    }
}

createGrid(player1);
createGrid(player2);