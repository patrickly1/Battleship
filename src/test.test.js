import { Ship,
    Cell, 
    Gameboard
 } from "./Classes";

it("Ship not initially sunk", () => {
    let newShip = new Ship(3);
    expect(newShip.isSunk()).toBe(false);
})

it("Ship sunk after receiving enough hits", () => {
    let newShip = new Ship(3);
    newShip.attacked();
    newShip.attacked()
    newShip.attacked();
    expect(newShip.isSunk()).toBe(true);
})

it("Gameboard populated", () => {
    let newGameBoard = new Gameboard();
    expect(newGameBoard.board.length).toBe(8);
    newGameBoard.board.forEach(row => {
        expect(row.length).toBe(8);
    })
})

it("Gameboard square has cell class", () => {
    let newGameBoard = new Gameboard();
    expect(newGameBoard.board[0][0]).toBeInstanceOf(Cell);
})

it("Placing the ship correctly onto cells vertically", () => {
    let newGameBoard = new Gameboard();
    let newShip = new Ship(3);
    newGameBoard.placeShip(newShip, "vertical", 0, 0);
    //Should have a ship
    expect(newGameBoard.board[0][0].hit).toBeFalsy();
    expect(newGameBoard.board[0][0].ship).not.toBeNull();
    expect(newGameBoard.board[0][1].hit).toBeFalsy();
    expect(newGameBoard.board[0][1].ship).not.toBeNull();
    expect(newGameBoard.board[0][2].hit).toBeFalsy();
    expect(newGameBoard.board[0][2].ship).not.toBeNull();
    //Should not have a ship
    expect(newGameBoard.board[0][3].hit).toBeFalsy();
    expect(newGameBoard.board[0][3].ship).toBeNull();
})

it("Placing the ship correctly onto cells horizontally", () => {
    let newGameBoard = new Gameboard();
    let newShip = new Ship(6);
    newGameBoard.placeShip(newShip, "horizontal", 1, 1)
    //Should have a ship
    expect(newGameBoard.board[0][0].hit).toBeFalsy();
    expect(newGameBoard.board[0][0].ship).toBeNull();
    expect(newGameBoard.board[1][1].hit).toBeFalsy();
    expect(newGameBoard.board[1][1].ship).not.toBeNull();
    expect(newGameBoard.board[2][1].hit).toBeFalsy();
    expect(newGameBoard.board[2][1].ship).not.toBeNull();
    expect(newGameBoard.board[3][1].hit).toBeFalsy();
    expect(newGameBoard.board[3][1].ship).not.toBeNull();
    expect(newGameBoard.board[4][1].hit).toBeFalsy();
    expect(newGameBoard.board[4][1].ship).not.toBeNull();
    expect(newGameBoard.board[5][1].hit).toBeFalsy();
    expect(newGameBoard.board[5][1].ship).not.toBeNull();
    //Should not have a ship
    expect(newGameBoard.board[6][1].hit).toBeFalsy();
    expect(newGameBoard.board[6][1].ship).not.toBeNull();
})

it("Ship placed out of bounds vertically", () => {
    let newGameBoard = new Gameboard();
    let newShip = new Ship(3);
    expect(newGameBoard.placeShip(newShip, "vertical", 6, 0)).toBeFalsy();
})

it("Ship placed out of bounds horizontally", () => {
    let newGameBoard = new Gameboard();
    let newShip = new Ship(3);
    expect(newGameBoard.placeShip(newShip, "horizontal", 0, 6)).toBeFalsy();
})

it("Ship placed in bounds vertically", () => {
    let newGameBoard = new Gameboard();
    let newShip = new Ship(3);
    expect(newGameBoard.placeShip(newShip, "vertical", 1, 1)).not.toBeFalsy();
})

it("Ship placed in bounds horizontally", () => {
    let newGameBoard = new Gameboard();
    let newShip = new Ship(3);
    expect(newGameBoard.placeShip(newShip, "horizontal", 1, 1)).not.toBeFalsy();
})

it("Ship coordinates out of bounds", () => {
    let newGameBoard = new Gameboard();
    let newShip = new Ship(3);
    expect(newGameBoard.placeShip(newShip, "vertical", 9, 9)).toBeFalsy();
})

it("Placing ship onto of another ship", () => {
    let newGameBoard = new Gameboard();
    let newShip = new Ship(3);
    expect(newGameBoard.placeShip(newShip, "vertical", 1, 1)).not.toBeFalsy();
    expect(newGameBoard.placeShip(newShip, "vertical", 1, 1)).toBeFalsy();
})

it("Empty cell gets hit", () => {
    let newGameBoard = new Gameboard();
    expect(newGameBoard.receiveAttack(0, 7)).not.toBeFalsy();
    expect(newGameBoard.board[7][0].hit).not.toBeFalsy();
})

it("Ship gets hit on board", () => {
    let newGameBoard = new Gameboard();
    let newShip = new Ship(3);
    newGameBoard.placeShip(newShip, "vertical", 1, 1)
    newGameBoard.receiveAttack(1, 1);
    expect(newGameBoard.board[1][1].ship.hit).not.toBeFalsy();
    expect(newGameBoard.board[1][1].ship.isSunk()).toBeFalsy();
})

it("Ship correctly sunk after hit on board (vertical)", () => {
    let newGameBoard = new Gameboard();
    let newShip = new Ship(3);
    newGameBoard.placeShip(newShip, "vertical", 1, 1)
    newGameBoard.receiveAttack(1, 1);
    newGameBoard.receiveAttack(2, 1);
    newGameBoard.receiveAttack(3, 1);
    expect(newGameBoard.board[1][1].ship.isSunk()).not.toBeFalsy();
})

it("Ship correctly sunk after hit on board (horizontal)", () => {
    let newGameBoard = new Gameboard();
    let newShip = new Ship(3);
    newGameBoard.placeShip(newShip, "horizontal", 1, 1)
    newGameBoard.receiveAttack(1, 1);
    newGameBoard.receiveAttack(1, 2);
    newGameBoard.receiveAttack(1, 3);
    expect(newGameBoard.board[1][1].ship.isSunk()).not.toBeFalsy();
})

it("All ships have not sunk", () => {
    let newGameBoard = new Gameboard();
    let newShip = new Ship(3);
    let newShip2 = new Ship(4);
    newGameBoard.placeShip(newShip, "vertical", 1, 1);
    newGameBoard.receiveAttack(1, 1);
    newGameBoard.receiveAttack(1, 2);
    newGameBoard.receiveAttack(1, 3);
    newGameBoard.placeShip(newShip2, "horizontal", 0, 0);
    newGameBoard.receiveAttack(0, 0);
    console.log(newShip.isSunk());
    console.log(newShip2.isSunk());
    expect(newGameBoard.allShipsSunk()).toBeFalsy();
})

it("All ships have sunk", () => {
    let newGameBoard = new Gameboard();
    let newShip = new Ship(3);
    let newShip2 = new Ship(4);
    newGameBoard.placeShip(newShip, "vertical", 1, 1);
    newGameBoard.receiveAttack(1, 1);
    newGameBoard.receiveAttack(2, 1);
    newGameBoard.receiveAttack(3, 1);
    newGameBoard.placeShip(newShip2, "horizontal", 0, 0);
    newGameBoard.receiveAttack(0, 0);
    newGameBoard.receiveAttack(0, 1);
    newGameBoard.receiveAttack(0, 2);
    newGameBoard.receiveAttack(0, 3);

    console.log(newShip.isSunk());
    console.log(newShip2.isSunk());
    expect(newGameBoard.allShipsSunk()).not.toBeFalsy();
})

it("Check if overlapping ships can be placed", () => {
    let newGameBoard = new Gameboard();
    let newShip = new Ship(3);
    let newShip2 = new Ship(4); 
    newGameBoard.placeShip(newShip, "vertical", 0, 1);
    expect(newGameBoard.placeShip(newShip2, "horizontal", 1, 0)).toBeFalsy();
})