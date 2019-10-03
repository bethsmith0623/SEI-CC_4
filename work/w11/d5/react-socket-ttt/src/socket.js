import tokenService from './services/tokenService';

const socket = window.io();
let App = null;

/*--- This is so that this module can setState on App ---*/
function registerApp(app) {
  App = app;
}

/*--- Listeners for messages from server ---*/
socket.on('update-game', function(game) {
  App.setState({game});
});


/*--- Functions that send messages to the server ---*/
function getActive() {
  socket.emit('get-active', tokenService.getToken());
}

function newGame() {
  socket.emit('new-game', tokenService.getToken());
}

function joinGame(gameId) {
  socket.emit('join-game', {
    token: tokenService.getToken(),
    gameId
  });
}

function move(idx) {
  socket.emit('move', {
    token: tokenService.getToken(),
    idx
  });
}

function logout() {
  socket.emit('logout', tokenService.getToken());
}

export default {
  registerApp,
  logout,
  getActive,
  newGame,
  joinGame,
  move
}