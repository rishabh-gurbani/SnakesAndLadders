const {snakeLadders} = require("./snake-ladders");

const rollDie = () => Math.floor(Math.random()*6+1);

let playerNames = ["Rishabh", "Abhinav", "Sid", "Swanand"];

const game = snakeLadders(playerNames);

let roll;
let messageOrBoard;
let currentPlayer = 0;

const progressOneMove = (roll = null) => {
    roll = roll ?? rollDie();
    console.log(playerNames[currentPlayer] + " rolled: " + roll);
    [status, messageOrBoard, currentPlayer,  history] = game(playerNames[currentPlayer], roll);
    console.log(messageOrBoard);
    console.log();
}

// to test three sixes
const testThreeSixes = () =>{
    progressOneMove();
    progressOneMove();
    progressOneMove();
    progressOneMove();
    progressOneMove(6);
    progressOneMove(6);
    progressOneMove(6);
    progressOneMove();
}


// // loop to simulate full game
const simulateGame = () => {
    do {
        progressOneMove();
    } while (messageOrBoard["gameStatus"] === "In progress");
}

// uncomment any of the following
// testThreeSixes();
simulateGame();
