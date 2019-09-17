// get our connection to the socket.io server
var socket = io();
// listen to the server for the `add-circle` event
socket.on('add-circle', function (data) {
  // console.log(data);
  addCircle(data);
});

// listen to the server for the `clear-display` event
socket.on('clear-display', function () {
  circles.innerHTML = '';
});

// listen to the server for when the player list has changed
socket.on('update-player-list', function (data) {
  var playerList = '<li>' + data.join('</li><li>') + '</li>';
  players.innerHTML = playerList;
});

var circles = document.getElementById('circles');
var players = document.getElementById('players');
var initials = '';

circles.addEventListener('click', function(evt) {
  //addCircle(evt.clientX, evt.clientY, randomBetween(10,100), getRandomRGBA());
  socket.emit('add-circle', {
    initials: initials,
    x: evt.clientX,
    y: evt.clientY,
    dia: randomBetween(10,125),
    rgba: getRandomRGBA()
  });
});

document.getElementsByTagName('button')[0].addEventListener('click', function() {
  socket.emit('clear-display');
});

do {
  initials = getInitials();
} while (initials.length < 2 || initials.length > 3);
// new code below
socket.emit('register-player', initials);

function getInitials() {
  var input = prompt("Please enter your initials");
  return input ? input.toUpperCase() : '';
}

// was: function addCircle(x, y, dia, rgba)
// now using ES2015 destructuring assignment
function addCircle( {x, y, dia, rgba, initials} ) {
  var el = document.createElement('div');
  el.style.left = x - Math.floor(dia / 2 + 0.5) + 'px';
  el.style.top = y - Math.floor(dia / 2 + 0.5) + 'px';
  el.style.width = el.style.height = dia + 'px';
  el.style.backgroundColor = rgba;
  el.style.fontSize = Math.floor(dia / 3) + 'px';
  el.style.color = 'white';
  el.style.textAlign = 'center';
  el.style.lineHeight = dia + 'px';
  el.innerHTML = initials;
  circles.appendChild(el);
}

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomRGBA() {
  return ['rgba(', randomBetween(0, 255), ',', randomBetween(0, 255), ',',
    randomBetween(0, 255), ',', randomBetween(2, 10) / 10, ')'].join('');
}
