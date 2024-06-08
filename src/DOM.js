export {
    toggleComputer,
    createGrid
}

let toggleState = "player";

function toggleComputer() {
    document.getElementById('toggleComputerSwitch').addEventListener('click', function() {
        toggleState = toggleState === "player" ? "computer" : "player";
        console.log(toggleState);
    });
    return toggleState;
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
            
            console.log(cell);
            
            button.addEventListener("click",() => {
                console.log(`Attempting to access Cell [${i}][${j}]`);
                console.log(cell);
                if (cell.hit) {
                    
                    console.log("Already hit");
                } else {
                    playersGameBoard.receiveAttack(i, j);
                    button.classList.add("hit");
                    console.log(`Button clicked: Cell ${i}${j}`);
                    //If hit was onto a ship
                    if (cell.ship) {
                        button.classList.add("hit-ship");
                        //If sunk
                        if (cell.ship.isSunk()) {
                            updateSunkShipClass(player, cell.ship, playerPrefix); 
                        }
                    }
                }
            })

            containerID.appendChild(button);
        }
    }
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





