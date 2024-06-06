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
    expect(newGameBoard.board.length).toBe(7);
    newGameBoard.board.forEach(row => {
        expect(row.length).toBe(8);
    })
})

it("Gameboard square has cell class", () => {
    let newGameBoard = new Gameboard();
    expect(newGameBoard.board[0][0]).toBeInstanceOf(Cell);
})

it("Placing the ship onto cells vertically", () => {
    let newGameBoard = new Gameboard();
    let newShip = new Ship(3);
    newGameBoard.placeShip(newShip, "vertical", 0, 0)
    //Should have a ship
    expect(newGameBoard.board[0][0].hit).toBeFalsy();
    expect(newGameBoard.board[0][0].ship).not.toBeNull();
    expect(newGameBoard.board[1][0].hit).toBeFalsy();
    expect(newGameBoard.board[1][0].ship).not.toBeNull();
    expect(newGameBoard.board[2][0].hit).toBeFalsy();
    expect(newGameBoard.board[2][0].ship).not.toBeNull();
    //Should not have a ship
    expect(newGameBoard.board[3][0].hit).toBeFalsy();
    expect(newGameBoard.board[3][0].ship).toBeNull();
})

it("Placing the ship onto cells horizontally", () => {
    let newGameBoard = new Gameboard();
    let newShip = new Ship(6);
    newGameBoard.placeShip(newShip, "horizontal", 1, 1)
    //Should have a ship
    expect(newGameBoard.board[0][0].hit).toBeFalsy();
    expect(newGameBoard.board[0][0].ship).toBeNull();
    expect(newGameBoard.board[1][1].hit).toBeFalsy();
    expect(newGameBoard.board[1][1].ship).not.toBeNull();
    expect(newGameBoard.board[1][2].hit).toBeFalsy();
    expect(newGameBoard.board[1][2].ship).not.toBeNull();
    expect(newGameBoard.board[1][3].hit).toBeFalsy();
    expect(newGameBoard.board[1][3].ship).not.toBeNull();
    expect(newGameBoard.board[1][4].hit).toBeFalsy();
    expect(newGameBoard.board[1][4].ship).not.toBeNull();
    expect(newGameBoard.board[1][5].hit).toBeFalsy();
    expect(newGameBoard.board[1][5].ship).not.toBeNull();
    //Should not have a ship
    expect(newGameBoard.board[1][6].hit).toBeFalsy();
    expect(newGameBoard.board[1][6].ship).not.toBeNull();
})