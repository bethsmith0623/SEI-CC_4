/*----- constants -----*/
var lookup = {
  '1': 'purple',
  '-1': 'lime',
  'null': 'white'
};

var winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

/*----- app's state (variables) -----*/
var board, turn, winner

/*----- cached element references -----*/
var squares = document.querySelectorAll('td div');
var message = document.querySelector('h1');

/*----- event listeners -----*/
document.querySelector('table').addEventListener('click', handleMove);
document.querySelector('button').addEventListener('click', initialize);

/*----- functions -----*/

initialize();

function handleMove(evt) {
  // obtain index of square
  var idx = parseInt(evt.target.id.replace('sq', ''));
  // check if square is available and return if not
  if (board[idx] || winner) return;
  // update state (board, turn, winner)
  board[idx] = turn;
  turn *= -1;
  winner = getWinner();
  render();
}

function getWinner() {
  for (var i = 0; i < winningCombos.length; i++) {
    if (Math.abs(board[winningCombos[i][0]] + board[winningCombos[i][1]] + board[winningCombos[i][2]]) === 3) return board[winningCombos[i][0]];
  }
  // Less elegant approach:
  // if (Math.abs(board[0] + board[1] + board[2]) === 3) return board[0];
  // if (Math.abs(board[3] + board[4] + board[5]) === 3) return board[3];
  // if (Math.abs(board[6] + board[7] + board[8]) === 3) return board[6];
  // if (Math.abs(board[0] + board[3] + board[6]) === 3) return board[0];
  // if (Math.abs(board[1] + board[4] + board[7]) === 3) return board[1];
  // if (Math.abs(board[2] + board[5] + board[8]) === 3) return board[2];
  // if (Math.abs(board[0] + board[4] + board[8]) === 3) return board[0];
  // if (Math.abs(board[2] + board[4] + board[6]) === 3) return board[2];
  if (board.includes(null)) return null;
  return 'T';
}

function render() {
  board.forEach(function(sq, idx) {
    squares[idx].style.background = lookup[sq];
  });
  if (winner === 'T') {
    message.innerHTML = 'Rats, another tie!';
  } else if (winner) {
    message.innerHTML = `Congrats ${lookup[winner].toUpperCase()}!`;
  } else {
    message.innerHTML = `${lookup[turn].toUpperCase()}'s Turn`;
  }
}

function initialize() {
  board = [null, null, null, null, null, null, null, null, null];
  // board = new Array(9).fill(null);
  turn = 1;
  winner = null;
  render();
}
