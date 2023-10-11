const {snakeLadders} = require("./snake-ladders");

const rollDie = () => Math.floor(Math.random()*6+1);

let playerNames = ["Rishabh", "Abhinav", "Sid", "Swanand"];

const game = snakeLadders(playerNames);

let roll;

roll = rollDie();
let [status, messageOrBoard, currentPlayer, history, next] = game("Rishabh", 1);
console.log(status);
console.log(messageOrBoard);

let player = 1;

// loop to simulate full game
while (messageOrBoard.get("gameStatus") === "In progress"){
    roll = rollDie();
    console.log(playerNames[currentPlayer] + " rolled: " + roll);
    [status, messageOrBoard, currentPlayer,  history] = game(playerNames[currentPlayer], roll);
    player=(player+1)%playerNames.length;
    console.log(status);
    console.log(messageOrBoard);
}

// console.log(history);