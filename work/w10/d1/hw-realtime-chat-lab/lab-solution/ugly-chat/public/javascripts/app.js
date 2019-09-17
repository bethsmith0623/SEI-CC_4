document.addEventListener("DOMContentLoaded", function() { 
  var messages = document.getElementById('messages');
  var newMsg = document.getElementById('new-msg');
  var userName = document.getElementById('user-name');
  
  var socket = io();
  socket.on('add-message', function (data) {
    addMessage(data);
  });

  document.getElementById('btn-send-msg').addEventListener('click', function() {
    socket.emit('add-message', {
      name: userName.value,
      msg: newMsg.value
    });
    newMsg.value = '';
  });

  function addMessage(data) {
    messages.innerHTML += ['<li><strong>', data.name, ':</strong> ', data.msg + '</li>'].join('');
  }

});
