import { Ship } from "./Classes";

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