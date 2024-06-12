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
    updateGridAfterShipPlacement
} from "./DOM"

export {
    getCellCoordinates
}

document.addEventListener("DOMContentLoaded", () => {
    const player1 = new Player("player");
    //togglleComputer currently set to player
    console.log("Start at player1");
    const player2 = new Player(toggleComputer());
    
    const player1GridContainer = document.getElementById("player1GridContainer")
    const player2GridContainer = document.getElementById("player2GridContainer")
    
    let ship1 = new Ship(3);
    player1.gameBoard.placeShip(ship1, "horizontal", 0, 0);
    
    let ship2 = new Ship(5);
    player2.gameBoard.placeShip(ship2, "vertical", 3, 2);

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

    // Assigning ship instances to their respective HTML elements
    document.querySelectorAll("#player1Ships .ship").forEach((element, index) => {
        element.dataset.shipIndex = index;
    });
    
    //create Grid
    createGrid(player1, player1GridContainer, "Player1");
    createGrid(player2, player2GridContainer, "Player2");

    //Allow player to add ships
    setupDragAndDrop(player1, player1GridContainer, player1Ships);
    
    //Initially start the game off with opponent's ships toggled off
    //and disable current player's grid
    toggleShipVisibility();
    disableButtons();
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
            console.log(`Dragging ship: ${draggedShip}`)// with length: ${draggedShip.length}`)
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
                if (player.gameBoard.placeShip(draggedShip, "horizontal", x, y)) {
                    console.log(`${draggedShip} is being placed at ${x} ${y}`);
    
                    player.gameBoard.placeShip(draggedShip, "horizontal", x, y)
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


