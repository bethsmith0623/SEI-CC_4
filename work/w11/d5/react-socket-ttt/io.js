const jwt = require('jsonwebtoken');
const Game = require('./models/game');
let io;

// Keep active games in memory for better performance
// and fire and forget saving of game documents
const games = {};

module.exports = {
  init,
  getIo
}

function init(http) {
  io = require('socket.io')(http);

  io.on('connection', function(socket) {

    // Clients send this message to receive a message with
    // a pending game (if any) when the app loads, refreshes or when
    // they login
    socket.on('get-active', async function(token) {
      const user = await validateToken(token);
      if (!user) return;
      let game = findGameInMemory(user);
      // Active game not in memory, check db just in case
      if (!game) game = await Game.getActiveForUser(user);
      if (game) {
        socket.join(game._id, function() {
          games[game._id] = game;
          io.to(game._id).emit('update-game', game);
        });
      }
    });

    // Player clicked to start a new game and will be "moved"
    // to WaitingPage
    socket.on('new-game', async function(token) {
      const user = await validateToken(token);
      if (!user) return;
      const game = await Game.createForUser(user);
      games[game._id] = game;
      socket.join(game._id, function() {
        io.to(game._id).emit('update-game', game);
      });
    });

    socket.on('join-game', async function({token, gameId}) {
      const user = await validateToken(token);
      if (!user) return;
      const game = games[gameId];
      game.players.push({
        name: user.name,
        playerId: user._id
      });
      game.save();
      socket.join(game._id, function() {
        io.to(game._id).emit('update-game', game);
      });
    });

    socket.on('move', async function({token, idx}) {
      const user = await validateToken(token);
      if (!user) return;
      let game = findGameInMemory(user);
      if (!game.board[idx]) game.board[idx] = game.turn;
      game.winner = getWinner(game.board);
      if (!game.winner) game.turn *= -1;
      io.to(game._id).emit('update-game', game);
      game.save();
    });

    socket.on('logout', async function(token) {
      const user = await validateToken(token);
      if (!user) return;
      let game = findGameInMemory(user);
      if (!game) game = await Game.getActiveForUser(user);
      if (game) {
        socket.leave(game._id, function() {
          const player = game.players.find(p => p.playerId.equals(user._id));
          game.players.remove(player._id);
          if (!game.players.length) {
            delete games[game._id];
            Game.findByIdAndDelete(game._id).exec();
          }
        });
      }
    });

  });

}

function getIo() {
  return io;
}

function validateToken(token) {
  return new Promise(function(resolve) {
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) resolve(false);
      resolve(decoded.user);    
    });
  });
}

function findGameInMemory(user) {
  let gamesArr = Object.values(games);
  const game = gamesArr.find(g => g.players.some(p => p.playerId == user._id));
  return game;
}

function getWinner(board) {
  if (Math.abs(board[0] + board[1] + board[2]) === 3) return board[0];
  if (Math.abs(board[3] + board[4] + board[5]) === 3) return board[3];
  if (Math.abs(board[6] + board[7] + board[8]) === 3) return board[6];
  if (Math.abs(board[0] + board[3] + board[6]) === 3) return board[0];
  if (Math.abs(board[1] + board[4] + board[7]) === 3) return board[1];
  if (Math.abs(board[2] + board[5] + board[8]) === 3) return board[2];
  if (Math.abs(board[0] + board[4] + board[8]) === 3) return board[0];
  if (Math.abs(board[2] + board[4] + board[6]) === 3) return board[2];
  if (board.includes(null)) return null;
  return 0;
}

