# Paint Bucket Challenge

The goal of this exercise is to write a recursive flooding algorithm to flood adjacent game squares of the same color with a different color of your choosing.

The buttons enable you to choose the color with which to flood the board.

When you click a square, the flooding function will be called with that square's row and column coordinates in the `gameBoard` object.

The function should find all adjacent squares with the same value as the clicked square and change their values to the new color chosen with the buttons. The process should recursively continue and flood the squares of the given color until all adjacent squares of that color have been filled with the new color.

Read through the code and comments in the `app.js` file to understand how the program is working. The only code you need to write is to fill in the `recursiveFlood()` function — everything else is set up for you as long as you call the `renderSquare()` function for any squares that you change.
