export {
    toggleComputer,
    createGrid,
    toggleShipVisibility,
    disableButtons,
    updateGridAfterShipPlacement,
    toggleShipOrientation,
    updateSunkShipClass,
    gameOverDOM,
    updateOpponentDOM,
    updatePlayer2FormDOM,
    switchTurn,
    switchPlayersTurnDOM,
    disableAllButtons,
    initialSwitchPlayersTurnDOM,
    updateAllShipsPlacedDOM,
    clearAllShipsPlacedDOM,
    addRotateShipButton
}

import {
    getCellCoordinates,
    player1Ships,
    player2Ships,
    player1
} from "./index"

import {
    computerTurntoAttack
} from "./Computer"

let currentPlayer = "player1";
let toggleOpponent = "player2";
let toggleCurrentOrientation = "horizontal";

function toggleShipOrientation()  {
    document.getElementById('toggleShipOrientationSwitch').addEventListener("click", function() {
        toggleCurrentOrientation = toggleCurrentOrientation === "horizontal" ? "vertical" : "horizontal";
        console.log(toggleCurrentOrientation);
    })

    const allShips = document.querySelectorAll(".ship");
    console.log(allShips);

    if (toggleCurrentOrientation === "horizontal") {
        allShips.forEach(ship => ship.classList.add("horizontal"));
        allShips.forEach(ship => ship.classList.remove("vertical"));
    } else if (toggleCurrentOrientation === "vertical") {
        allShips.forEach(ship => ship.classList.add("vertical"));
        allShips.forEach(ship => ship.classList.remove("horizontal"));
    }
    
    return toggleCurrentOrientation;
}

//tests if this toggleComputer function works
function toggleComputer() {
    document.getElementById('toggleComputerSwitch').addEventListener('click', function() {
        toggleOpponent = toggleOpponent === "player2" ? "computer" : "player2";
        //This line doesn't work, trouble shoot later
        //console.log(toggleOpponent, "toggleOpponent variable");
        //updateOpponentDOM(toggleOpponent);

        player2 = new Player(toggleOpponent);
        console.log(player2.type, "player2.type");

        
    });
    return toggleOpponent;
}

function updateOpponentDOM(opponent) {
    const opponentElement = document.getElementById("opponent");
    opponentElement.innerHTML = "";
    let extraWord, extraWord2;
    
    const opponentDiv = document.createElement("div");
    if (opponent === "computer") {
        extraWord = "the ";
        extraWord2 = "";
    } else {
        extraWord = "";
        extraWord2 = ". Please enter their name";
    };
    opponentDiv.innerHTML = `Your opponent will be ${extraWord}${opponent}${extraWord2}. Click start game when you are ready!`;

    opponentElement.appendChild(opponentDiv);
    console.log("function worked");
}

function updatePlayer2FormDOM(opponent) {
    const player2FormElement = document.getElementById("player2Form");

    if (opponent === "computer") {
        //empty form
        player2FormElement.innerHTML = "";
    } else if (opponent === "player2") {
        //re-add the form
        const label = document.createElement("label");
        label.setAttribute("for", "player2");
        label.textContent = "Player2 Name:";

        const input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("id", "player2");
        input.setAttribute("name", "player2");
        input.required = true;

        player2FormElement.appendChild(label);
        player2FormElement.appendChild(input);

    }
}

function createGrid(player, containerID, playerPrefix) {
    let playersGameBoard = player.gameBoard;
    for (let i = 0; i < playersGameBoard.rows; i++){
        for (let j = 0; j < playersGameBoard.columns; j++) {
            const button = document.createElement("button");

            let playerUniqueCode;

            if (player.type === "player1") {
                playerUniqueCode = "Player1";
            } else if (player.type === "player2") {
                playerUniqueCode = "Player2";
            } else {playerUniqueCode = "Computer"}

            button.id = `${playerUniqueCode}-id${i}${j}`;
            button.classList.add(playerUniqueCode);

            const cell = playersGameBoard.board[j][i];

            if (cell.ship !== null) {
                button.classList.add("ship");
            }
            
            button.addEventListener("click",() => {
                console.log(`Attempting to access Cell [${i}][${j}]`);
                console.log(cell);

                if (cell.hit) {
                    console.log("Already hit");
                } else {
                    playersGameBoard.receiveAttack(i, j);
                    button.classList.add("hit");

                    //If hit was onto a ship
                    if (cell.ship) {
                        button.classList.add("hit-ship");

                        //If sunk
                        if (cell.ship.isSunk()) {
                            updateSunkShipClass(player, cell.ship, playerPrefix); 
                        }
                    }

                    //Check win condition (all ships sunk)
                    if (playersGameBoard.allShipsSunk()) {
                        gameOverDOM(currentPlayer);
                        console.log(player, "game over");
                    }

                    //Troubleshoot why I need this function?
                    if (player.type === "computer" ){
                        switchTurn();
                    }
                    switchPlayersTurnDOM(playerPrefix);

                    console.log(playerPrefix, "playerPrefix test");
                    
                    if (toggleOpponent === "computer") {
                        switchPlayersTurnDOM("computer");
                    }

                    if (player.type === "computer") {
                        setTimeout(() => { 
                            computerTurntoAttack();
                            switchTurn();
                            switchPlayersTurnDOM(player1.name);
                            toggleShipVisibility();
                            disableButtons();
                        }, 500) // Computer attacks after short delay
                    } else {
                        setTimeout(() => {
                            switchTurn();
                            switchPlayersTurnDOM(playerPrefix);
                            toggleShipVisibility();
                            disableButtons();
                        }, 1500) //Add longer timeout if versing another player
                    }
                }
            })

            containerID.appendChild(button);
        }
    }
}

function disableButtons() {
    const player1Buttons = document.querySelectorAll(".Player1");
    const player2Buttons = document.querySelectorAll(".Player2");
    const computerButtons = document.querySelectorAll(".Computer");
    //console.log("disable buttons", player1Buttons)

    if (currentPlayer === "player1") {
        player2Buttons.forEach(button => button.disabled = false);
        computerButtons.forEach(button => button.disabled = false);
        player1Buttons.forEach(button => button.disabled = true);
    } else {
        player1Buttons.forEach(button => button.disabled = false);
        player2Buttons.forEach(button => button.disabled = true);
        computerButtons.forEach(button => button.disabled = true);
    }
}

function disableAllButtons() {
    const player1Buttons = document.querySelectorAll(".Player1");
    const player2Buttons = document.querySelectorAll(".Player2");
    const computerButtons = document.querySelectorAll(".Computer");

    player1Buttons.forEach(button => button.disabled = true);
    player2Buttons.forEach(button => button.disabled = true);
    computerButtons.forEach(button => button.disabled = true);
}

function toggleShipVisibility() {
    const player1Buttons = document.querySelectorAll(".Player1.ship");
    const player2Buttons = document.querySelectorAll(".Player2.ship");
    //console.log("toggleshipvisibility", player1Buttons);

    if (currentPlayer === "player1") {
        player2Buttons.forEach(button => button.classList.add("hide-ship"));
        player1Buttons.forEach(button => button.classList.remove("hide-ship"));
    } else {
        player1Buttons.forEach(button => button.classList.add("hide-ship"));
        player2Buttons.forEach(button => button.classList.remove("hide-ship"));
    }
}

function gameOverDOM(currentPlayer) {
    const gameOverDiv = document.getElementById("gameOver");

    const gameOverElement = document.createElement("div");
    //In the event users continue playing, reset game over statement
    gameOverDiv.innerHTML = "";
    gameOverElement.innerHTML = `Game over! ${currentPlayer} has won the game.`

    gameOverDiv.appendChild(gameOverElement);
}

function switchPlayersTurnDOM(currentPlayer) {
    const playerTurnDiv = document.getElementById("switchPlayersTurn");
    playerTurnDiv.innerHTML = "";

    const playerTurnElement = document.createElement("div");
    playerTurnElement.innerHTML = `It is ${currentPlayer}'s turn`;

    playerTurnDiv.appendChild(playerTurnElement);
}

function initialSwitchPlayersTurnDOM() {
    const playerTurnDiv = document.getElementById("switchPlayersTurn");
    playerTurnDiv.innerHTML = "";

    const playerTurnElement = document.createElement("div");
    playerTurnElement.innerHTML = `Once all ships have been placed, Player1 will start first.`;

    playerTurnDiv.appendChild(playerTurnElement);
}

function switchTurn() {
    currentPlayer = currentPlayer === "player1" ? toggleOpponent : "player1";
    console.log(`${currentPlayer}'s turn`);
}

function updateAllShipsPlacedDOM(player) {
    const allShipsPlacedDiv = document.getElementById("allShipsPlaced");
    allShipsPlacedDiv.innerHTML = "";

    const allShipsPlacedElement = document.createElement("div");
    allShipsPlacedElement.innerHTML = `Waiting for ${player.name} to place all of their ships...`;

    allShipsPlacedDiv.appendChild(allShipsPlacedElement);
}

function clearAllShipsPlacedDOM() {
    const allShipsPlacedDiv = document.getElementById("allShipsPlaced");
    allShipsPlacedDiv.innerHTML = "";
}

function updateSunkShipClass(player, sunkShip, playerPrefix) {
    const playersGameBoard = player.gameBoard;
    for (let i = 0; i < playersGameBoard.rows; i++) {
        for (let j = 0; j < playersGameBoard.columns; j++) {
            const cell = playersGameBoard.board[i][j];
            if (cell.ship === sunkShip) {
                const button = document.getElementById(`${playerPrefix}-id${j}${i}`);
                button.classList.add("sunk");
            }
        }
    }
}

function updateGridAfterShipPlacement(player, gridContainer) {
    const gameBoard = player.gameBoard;
    console.log(gridContainer, "gridContainer");
    const cells = gridContainer.querySelectorAll("button");

    cells.forEach(cell => {
        const [x, y] = getCellCoordinates(cell.id);
        const currentCell = gameBoard.board[y][x];

        if (currentCell.ship) {
            cell.classList.add("ship");
        }
    });
}

function addRotateShipButton() {
    const rotateShipButton = document.createElement("button"); 
    rotateShipButton.setAttribute("type", "button");
    rotateShipButton.setAttribute("id", "toggleShipOrientationSwitch");
    rotateShipButton.textContent = "Rotate Ship";
    
    document.getElementById("rotateShipButtonContainer").appendChild(rotateShipButton);
}

function removeRotateShipButton() {
    return;
}