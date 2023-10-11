const snakeLadders = (playerNames) => {

    // 1. Storing player's names.
    // In case of two players, could have stored names in n variables.
    // But for more players, creating a list of players is better.
    const players = [...playerNames];

    // Choosing first player.
    // Current player is stored as index.
    let currentPlayer = 0;

    // 2. Deciding current and next player.
    // Lookup table appropriate for 2 players.
    // But since we're using a list of players, we can simply point to next player in list.
    const nextPlayer = (currentPlayer) => (currentPlayer+1)%players.length;

    //  4. Board status
    //  Two ways to approach this
    //
    //  i.  Creating a 10x10 array to visualise the board:
    //      While it is visually representative and closer to domain,
    //      the majority of the array will be empty at all times.
    //      This is because we only have two players, and we can only fill
    //      two cells in the entire 10x10 board at any time.
    //      In the case of tic-tac-toe, this approach made more sense, because
    //      eventually, the majority of the grid was getting filled.
    //      And keeping track of all moves/positions of the player would be difficult otherwise.
    //      We would probably have to store their moves in two separate arrays
    //          X:[1, 3, 4]
    //          O:[2, 5, 6]
    //      Instead, storing the all information in the board was compact, and closer to the domain.
    //
    //  ii. Representing the board status with a map:
    //      Storing the current position of both players in a Map.
    //          player: playerPosition
    //      This saves us from having a sparse array
    //      Storing all the previous moves of the players, is not particularly helpful for the core
    //      of this game. In tic-tac-toe, combination of all previous moves was crucial in deciding outcome.
    //      Here, at any point, only current position of the players help decide outcome.
    //      Extension :
    //          Storing history/past positions of these players in a list to make it modular.
    //          Can be helpful to implement undo functions or rollback to any point in the game.
    //          P.S: Taking inspiration from React Docs.
    //

    // making use of map for storing player positions
    const board = new Map();
    board.set("gameStatus", "In progress"); // In progress, or name of winner
    players.forEach(player => {
        board.set(player, 1);
    });
    // each player starts at 1
    // board should look like this after initialisation
    // board{
    //     status: "In progress",
    //     rishabh: 1,
    //     sid: 1,
    //     abhinav: 1
    //  }

    // storing history of moves, as list of board objects
    const gameHistory = [];


    // 5. Snake and Ladder positions on board
    // using a lookup table for snake and ladder, start and end points.
    // start : end
    // can expose API to simpy add, remove or create new positions from scratch
    // snakes, ladders defined with "let", for these modifications, in case of new positions
    let snakes = {
        28: 10,
        37: 3,
        48: 16,
        75: 32,
        94: 71,
        96: 42,
    }

    let ladders = {
        4: 56,
        12: 50,
        14: 55,
        22: 58,
        41: 79,
        54: 88,
    }

    // if single change
    const addOrModifySnakes = (start, end) => {
        snakes[start] = end;
    }

    // positions is a list of list, each list having start, end positions
    const createNewSnakes = (positions) =>{
        snakes = positions.reduce((acc, [start, end]) => ({ ...acc, [start]: end }), {});
    }

    // A valid move has to only consider the number on the die
    // two players can be on the same spot
    function validMove(move) {
        return (1<=move && move<=6);
    }

    function getGameStatus() {
        let status = "In progress";
        board.forEach( (value, key) => {
                if (value === 100) status = `${key} won the game!`;
            }
        );
        return status;
    }

    // 5. Changing player position on board
    function makeMove(player, move){
        const currPosition = board.get(player);

        let nextPosition = currPosition + move;

        // check for snake or ladder
        if(snakes[nextPosition]){
            console.log(`Fell down from ${nextPosition} to ${snakes[nextPosition]}`);
            nextPosition = snakes[nextPosition];
        } else if (ladders[nextPosition]){
            console.log(`Went up from ${nextPosition} to ${ladders[nextPosition]}`);
            nextPosition =ladders[nextPosition];
        }

        // can move ahead only if next position is <= 100
        // position can not exceed 100.
        // in case that happens, don't make a move.
        if(nextPosition <= 100) {
            board.set(player, nextPosition);
            board.set("gameStatus", getGameStatus());
        }
        // if move is 6, player gets another turn.
        if (move !== 6) {
            currentPlayer = nextPlayer(currentPlayer);
        }
    }

    console.log(getGameStatus());

    // API to play the game
    return (player, move)=>{
        // check for valid player
        if(!players.includes(player) || player!== players[currentPlayer]){
            return [false, "Invalid player!", currentPlayer];
        }

        // check for valid move
        if(!validMove(move)){
            return [false, "Invalid move. Try Again!", currentPlayer];
        }

        makeMove(player, move);

        gameHistory.push(new Map(board));

        // returning currenPlayer only for testing purposes
        return [true, board, currentPlayer, gameHistory];

    }


}

module.exports = {snakeLadders}