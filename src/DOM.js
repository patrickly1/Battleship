export {
    toggleComputer,
    createGrid
}

let currentPlayer = "player1";
let toggleOpponent = "player2";

function toggleComputer() {
    document.getElementById('toggleComputerSwitch').addEventListener('click', function() {
        toggleOpponent = toggleOpponent === "player2" ? "computer" : "player2";
        console.log(toggleOpponent);
    });
    return toggleOpponent;
}

function createGrid(player, containerID, playerPrefix) {
    let playersGameBoard = player.gameBoard;
    for (let i = 0; i < playersGameBoard.rows; i++){
        for (let j = 0; j < playersGameBoard.columns; j++) {
            const button = document.createElement("button");
            button.id = `${playerPrefix}-id${i}${j}`;

            const cell = playersGameBoard.board[j][i];

            if (cell.ship !== null) {
                button.classList.add("ship");
            }
            
            //console.log(cell);
            
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
                }

                switchTurn();
                //Manage player turn
                if (currentPlayer === "player1") {
                    switchPlayersTurnDOM(currentPlayer);
                    console.log(`It is ${currentPlayer}'s (your turn) turn`);
                } else if (currentPlayer === "player2") {
                    switchPlayersTurnDOM(currentPlayer);
                    console.log(`It is ${currentPlayer}'s turn`)
                } else {
                    console.log("No player found")
                }
            })

            containerID.appendChild(button);
        }
    }
}

function gameOverDOM(currentPlayer) {
    const gameOverDiv = document.getElementById("gameOver");

    const gameOverElement = document.createElement("div");
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

function switchTurn() {
    currentPlayer = currentPlayer === "player1" ? toggleOpponent : "player1";
    console.log(`${currentPlayer}'s turn`);
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