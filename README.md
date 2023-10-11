# Snakes and Ladders in Javascript

## Gameplay

1. Assuming two players to start with, store names.
2. Players play in order of their names given.
3. Rolls die, random number between 1-6. [rule]
4. Moves ahead.
5. If encounter snake, move down. If encounter ladder, move up. [rule]
6. If rolled number was 6, get extra turn. Else next player rolls. [rule]
7. Goes on until one reaches 100. 
8. Need to reach exact 100, else remains at same position. [rule]

## Requirements

1. Storing player's names
2. currentPlayer, nextPlayer (for now only two players)
3. rollDie function (orchestrator level), API will only take input of 1-6
4. Board status
5. Snake and ladder positions. start and end point for each. 
6. Change player position on board
7. Game status (win-1, win-2). Game can not draw.

## Choices and Reasoning
###### Only major ones discussed here, for more detailed ones check comments in code

1. **Storing player names in list**  
In case of two players, could have stored names in 2 variables.
But for more players, creating a list of players is better instead of using n variables.
2. **Deciding current and next player**
Lookup table appropriate for 2 players.
But since we're using a list of players, we can simply point to next player in list.
3. **Board Status**

    i.  **Creating a 10x10 array to visualise the board:** \
While it is visually representative and closer to domain,
the majority of the array will be empty at all times.
This is because we only have two players, and we can only fill
two cells in the entire 10x10 board at any time. \
In the case of tic-tac-toe, this approach made more sense, because
eventually, the majority of the grid was getting filled.
And keeping track of all moves/positions of the player would be difficult otherwise.
We would probably have to store their moves in two separate arrays \
X:[1, 3, 4] \
O:[2, 5, 6] \
Instead, storing the all information in the board was compact, and closer to the domain.\
    ii. **Representing the board status with a map:** \
Storing the current position of both players in a Map. \
player: playerPosition \
This saves us from having a sparse array. \
Storing all the previous moves of the players, is not particularly helpful for the core
of this game. In tic-tac-toe, combination of all previous moves was crucial in deciding outcome.
Here, at any point, only current position of the players help decide outcome. \
Extension :
Storing history/past positions of these players in a list to make it modular.
Can be helpful to implement undo functions or rollback to any point in the game. \
P.S: Taking inspiration from React Docs. 
4. **Snake and Ladder positions on board** \
   Using a lookup table for snake and ladder, start and end points.\
   start : end