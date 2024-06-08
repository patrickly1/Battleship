import _ from "lodash";
import "./style.css";
import { Ship,
    Cell, 
    Gameboard,
    Player
 } from "./Classes";

import {
    toggleComputer,
    createGrid
} from "./DOM"

let player1 = new Player("player");
//togglleComputer currently set to player
console.log("Start at player1");
let player2 = new Player(toggleComputer());

const player1GridContainer = document.getElementById("player1GridContainer")
const player2GridContainer = document.getElementById("player2GridContainer")

let ship1 = new Ship(3);
player1.gameBoard.placeShip(ship1, "horizontal", 0, 0);

let ship2 = new Ship(5);
player2.gameBoard.placeShip(ship2, "vertical", 3, 2);

//create Grid
createGrid(player1, player1GridContainer, "Player1");
createGrid(player2, player2GridContainer, "Player2");

