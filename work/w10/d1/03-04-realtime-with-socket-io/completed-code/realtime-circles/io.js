var io = require('socket.io')();

// object to track player's initials
var players = {};

io.on('connection', function (socket) {

    socket.on('register-player', function (initials) {
      // each socket has a unique id
      players[socket.id] = initials;
      io.emit('update-player-list', Object.keys(players).map(id => players[id]));
    });

    socket.on('add-circle', function (data) {
      io.emit('add-circle', data);
    });

    socket.on('clear-display', function () {
      io.emit('clear-display');
    });

    // when the player disconnects, remove key & notify clients
    socket.on('disconnect', function () {
      delete players[socket.id];
      io.emit('update-player-list', Object.keys(players).map(id => players[id]));
    });

});

module.exports = io;