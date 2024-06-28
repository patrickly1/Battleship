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
    toggleShipOrientation,
    updateOpponentDOM,
    updatePlayer2FormDOM,
    switchTurn,
    switchPlayersTurnDOM,
    disableAllButtons
} from "./DOM"

import {
    placeComputerShips
} from "./Computer"

export {
    getCellCoordinates,
    player1,
    player2
}

let currentPlayer = "player1";
let toggleOpponent = "player2";
let toggleCurrentOrientation = "horizontal";

const player1 = new Player("player1");
//toggleComputer currently set to player
console.log("Start at player1");

let player2;

document.addEventListener("DOMContentLoaded", () => {
    const player1GridContainer = document.getElementById("player1GridContainer");
    const player2GridContainer = document.getElementById("player2GridContainer");    

    //Sample ship
    //let ship1 = new Ship(3);
    //player1.gameBoard.placeShip(ship1, "horizontal", 0, 0);

    //create player ships
    const player1Ships = [
        new Ship(2),
        new Ship(3),
        new Ship(3),
        new Ship(4),
        new Ship(5)
    ]
    
    const player2Ships = [
        new Ship(2),
        new Ship(3),
        new Ship(3),
        new Ship(4),
        new Ship(5)
    ]
    
    //Toggle button to switch between "player2" and "computer"
    document.getElementById('toggleComputerSwitch').addEventListener("click", function() {
        toggleOpponent = toggleOpponent === "player2" ? "computer" : "player2";
        console.log(toggleOpponent, "toggleComputerSwitch");
        updateOpponentDOM(toggleOpponent);
        updatePlayer2FormDOM(toggleOpponent);

        player2 = new Player(toggleOpponent);  // Reinitialize player2 based on the new toggle state
        console.log(player2.type, "player2.type");
    });

    // Function to create and append ship elements
    function createShipElements(containerId, ships) {
        const shipsContainer = document.getElementById(containerId);
        ships.forEach((ship, index) => {
            const shipElement = document.createElement("div");
            shipElement.className = `ship ship${index + 1} horizontal`;
            shipElement.setAttribute("draggable", "true");
            shipElement.setAttribute("data-length", ship.length);
            shipElement.setAttribute("data-ship-index", index);
            shipElement.innerText = `Ship ${index + 1} (${ship.length})`;
            shipsContainer.appendChild(shipElement);
        });
    }
    
    document.getElementById("startButton").addEventListener("click", function () {
        //Prevent clicking start game multiple times to populate new game
        if (document.getElementById("player1GridContainer").innerHTML !== "") {
            return;
        }

        //Get rid of form once game has started
        const beginGameElement = document.getElementById("beginGame");
        beginGameElement.textContent = "";
                
        //Create and append player1 ships
        createShipElements("player1ShipsContainer", player1Ships);

        // Reinitialize player2 based on the current value of toggleOpponent
        player2 = new Player(toggleOpponent);
        console.log("player2 type initially", player2.type);
        console.log("toggleOpponent", toggleOpponent);

        //create Grid
        createGrid(player1, player1GridContainer, "Player1");
        
        //Check if we user is versing another player or computer
        if (player2.type === "player2"){
            createGrid(player2, player2GridContainer, "Player2");
            console.log("Placing player 2's ships");
            createShipElements("player2ShipsContainer", player2Ships);
        } else if (player2.type === "computer") {
            createGrid(player2, player2GridContainer, "Computer");
            console.log("Placing computer ships");
            placeComputerShips();
        }
        
        //Initially start the game off with opponent's ships toggled off
        //and disable current player's grid
        toggleShipVisibility();
        disableAllButtons();

        //Allow player to add ships
        setupDragAndDrop(player1, player1GridContainer, player1Ships);
        
        if (player2.type === "player2") {
            setupDragAndDrop(player2, player2GridContainer, player2Ships);
        }

        //Check if all ships have been placed, then switch (if vsing another player) or
        //start game
        //console.log("Checking ships removed to switch turns", allShipsRemoved);
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

let allShipsRemoved;

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
                    console.log(`${draggedShip[0]}${draggedShip[1]} is being placed at ${x} ${y}`);
    
                    player.gameBoard.placeShip(draggedShip, toggleCurrentOrientation, x, y)

                    //remove ship from list
                    const index = ships.indexOf(draggedShip);
                    if (index > -1) {
                        console.log("removing ship", ships[index]);
                        console.log("index of ship", index);
                        ships[index] = null;
                    }
  
                    console.log(ships, "list of ships");
                    draggedShipElement.remove();

                    //update DOM
                    updateGridAfterShipPlacement(player, gridContainer);

                    //check if all ships are removed
                    let allShipsRemoved = true; //assume true, but we will check
                    for (let i = 0; i < ships.length; i++) {
                        if (ships[i] !== null) {
                            allShipsRemoved = false;
                            break
                        } 
                    }
                    console.log(allShipsRemoved, "checking if ships are empty");
                    
                    //Allow players to take turns placing ships
                    if (allShipsRemoved && toggleOpponent === "player2") {
                        console.log("All ships removed, switching player turn...");
                        setTimeout(() => {
                            switchTurn();
                            toggleShipVisibility();
                            if (player.type === "player2") {
                                disableButtons();
                            } else {
                                disableAllButtons();
                            }
                        }, 1500)

                    }

                } else {
                    console.log("Out of bounds");
                }
            } else {
                console.log("No ship being dragged");
            }  
        })
    })
}


