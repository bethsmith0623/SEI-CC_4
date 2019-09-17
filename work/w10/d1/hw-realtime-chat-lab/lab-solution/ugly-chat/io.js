var io = require('socket.io')();

io.on('connection', function (socket) {

    socket.on('add-message', function (data) {
      io.emit('add-message', data);
    });

});

module.exports = io;