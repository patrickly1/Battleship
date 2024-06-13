import _ from "lodash";
import "./style.css";
import { Ship,
    Cell, 
    Gameboard,
    Player
 } from "./Classes";

import {
    toggleComputer,
    createGrid,
    toggleShipVisibility,
    disableButtons,
    updateGridAfterShipPlacement,
    toggleShipOrientation
} from "./DOM"

import {
    placeComputerShips
} from "./Computer"

export {
    getCellCoordinates,
    player2
}

let currentPlayer = "player1";
let toggleOpponent = "player2";
let toggleCurrentOrientation = "horizontal";

const player1 = new Player("player");
//toggleComputer currently set to player
console.log("Start at player1");

let player2 = new Player(toggleOpponent);
console.log("player2 type initially", player2.type);

document.addEventListener("DOMContentLoaded", () => {
    const player1GridContainer = document.getElementById("player1GridContainer");
    const player2GridContainer = document.getElementById("player2GridContainer");    

    let ship1 = new Ship(3);
    player1.gameBoard.placeShip(ship1, "horizontal", 0, 0);
    
    //let ship2 = new Ship(5);
    //player2.gameBoard.placeShip(ship2, "vertical", 3, 2);

    //create player ships
    const player1Ship1 = new Ship(2);
    const player1Ship2 = new Ship(3);
    const player1Ship3 = new Ship(3);
    const player1Ship4 = new Ship(4);
    const player1Ship5 = new Ship(5);

    const player1Ships = [
        player1Ship1,
        player1Ship2,
        player1Ship3,
        player1Ship4,
        player1Ship5
    ]

    //Assigning ship instances to their respective HTML elements
    document.querySelectorAll("#player1Ships .ship").forEach((element, index) => {
        element.dataset.shipIndex = index;
    });
    
    //Toggle button to switch between "player2" and "computer"
    document.getElementById('toggleComputerSwitch').addEventListener("click", function() {
        toggleOpponent = toggleOpponent === "player2" ? "computer" : "player2";
        console.log(toggleOpponent);
        player2 = new Player(toggleOpponent);  // Reinitialize player2 based on the new toggle state
    });

    document.getElementById("startButton").addEventListener("click", function () {
        //Prevent clicking start game multiple times to populate new game
        if (document.getElementById("player1GridContainer").innerHTML !== "") {
            return;
        }

        // Reinitialize player2 based on the current value of toggleOpponent
        player2 = new Player(toggleOpponent);
        console.log("player2 type initially", player2.type);

        
        
        //create Grid
        createGrid(player1, player1GridContainer, "Player1");
        console.log("player2type", player2.type);
        
        //Check if we user is versing another player or computer
        if (player2.type === "player2"){
            createGrid(player2, player2GridContainer, "Player2");
        } else if (player2.type === "computer") {
            createGrid(player2, player2GridContainer, "Computer");
            console.log("Placing computer ships");
            placeComputerShips();
        }
        
        //Allow player to add ships
        setupDragAndDrop(player1, player1GridContainer, player1Ships);
        
        //Initially start the game off with opponent's ships toggled off
        //and disable current player's grid
        toggleShipVisibility();
        disableButtons();
    })
    
    // Set up ship orientation toggle button
    document.getElementById('toggleShipOrientationSwitch').addEventListener("click", function() {
        toggleCurrentOrientation = toggleCurrentOrientation === "horizontal" ? "vertical" : "horizontal";
        console.log(toggleCurrentOrientation);
        
        const allShips = document.querySelectorAll(".ship");
        if (toggleCurrentOrientation === "horizontal") {
            allShips.forEach(ship => {
                ship.classList.add("horizontal");
                ship.classList.remove("vertical");
            });
        } else if (toggleCurrentOrientation === "vertical") {
            allShips.forEach(ship => {
                ship.classList.add("vertical");
                ship.classList.remove("horizontal");
            });
        }
    });
})

function getCellCoordinates(cellId) {
    const coords = cellId.match(/-id(\d)(\d)/);
    return [parseInt(coords[1]), parseInt(coords[2])];
}

function setupDragAndDrop(player, gridContainer, ships) {
    const shipElements = document.querySelectorAll(".ship");
    let draggedShipElement = null;
    let draggedShip = null;

    shipElements.forEach(shipElement => {
        shipElement.setAttribute("draggable", true);

        shipElement.addEventListener("dragstart", (event) => {
            draggedShipElement = shipElement;
            const shipIndex = shipElement.dataset.shipIndex;
            console.log(shipIndex);
            draggedShip = ships[shipIndex];
            console.log(ships);
            console.log(`Dragging ship: ${draggedShip}`)
            setTimeout(() => shipElement.classList.add("dragging"), 0);
        });

        shipElement.addEventListener("dragend", (event) => {
            draggedShipElement = null;
            draggedShip = null;
            shipElement.classList.remove("dragging");                
        })
    })

    const cells = gridContainer.querySelectorAll("button");
    cells.forEach(cell => {
        cell.addEventListener("dragover", (event) => {
            event.preventDefault();
        })

        cell.addEventListener("drop", (event) => {
            event.preventDefault();
            const [x, y] = getCellCoordinates(cell.id);

            if (draggedShip) {
                console.log("TESTING", toggleCurrentOrientation);
                if (player.gameBoard.placeShip(draggedShip, toggleCurrentOrientation, x, y)) {
                    console.log(`${draggedShip} is being placed at ${x} ${y}`);
    
                    player.gameBoard.placeShip(draggedShip, toggleCurrentOrientation, x, y)
                    draggedShipElement.remove();

                    //update DOM
                    updateGridAfterShipPlacement(player, gridContainer);
                } else {
                    console.log("Out of bounds");
                }
            } else {
                console.log("No ship being dragged");
            }  
        })
    })
}


