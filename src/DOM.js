export {
    toggleComputer,
}

let toggleState = "player";

function toggleComputer() {
    document.getElementById('toggleComputerSwitch').addEventListener('click', function() {
        toggleState = toggleState === "player" ? "computer" : "player";
        console.log(toggleState);
    });
    return toggleState;
}



