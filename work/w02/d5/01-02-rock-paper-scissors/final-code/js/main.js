/*----- constants -----*/
const lookupRPS = ['r', 'p', 's'];

const rps = {
  r: {
    beats: 's',
    imgUrl: 'imgs/rock.png'
  },
  p: {
    beats: 'r',
    imgUrl: 'imgs/paper.png'
  },
  s: {
    beats: 'p',
    imgUrl: 'imgs/scissors.png'
  }
};

const beepAudio = new Audio('http://soundbible.com/mp3/Robot_blip-Marianne_Gagnon-120342607.mp3');
const goAudio = new Audio('http://soundbible.com/mp3/shooting_star-Mike_Koenig-1132888100.mp3');

/*----- app's state (variables) -----*/
let scores, results, winner;

/*----- cached element references -----*/
const pScoreEl = document.querySelector('#player h2');
const cScoreEl = document.querySelector('#computer h2');
const tScoreEl = document.querySelector('#middle h2');

const pResultEl = document.querySelector('#player div div');
const cResultEl = document.querySelector('#computer div div');

const countdownEl = document.querySelector('#middle div');

/*----- event listeners -----*/
document.querySelector('button').addEventListener('click', playHand);

/*----- functions -----*/
initialize();

function initialize() {
  scores = {
    p: 0,
    c: 0,
    t: 0
  };
  // display rocks at start
  results = {
    p: 'r',
    c: 'r'
  };
  winner = null;
  render();
}

function playHand() {
  // go is a callback (see below) to be run after the countdown finishes
  doCountdown(go);
}

function doCountdown(cb) {
  let count = 3;
  beepAudio.play();
  countdownEl.textContent = count;
  countdownEl.style.border = '4px solid black';
  let timerId = setInterval(function() {
    count--;
    if (count) {
      beepAudio.play();
      countdownEl.textContent = count;
    } else {
      clearInterval(timerId);
      goAudio.play();
      countdownEl.textContent = '';
      countdownEl.style.border = '4px solid white';
      cb();
    }
  }, 1000);
}

function go() {
  results.p = lookupRPS[getRandomIdx()];
  results.c = lookupRPS[getRandomIdx()];
  winner = getWinner();
  scores[winner]++;
  render();
}

function getWinner() {
  return results.p === results.c ?
    't'
  :
    // does what the player beats equal to what the computer has?
    rps[results.p].beats === results.c ? 'p' : 'c';
}

function render() {
  // render scores
  pScoreEl.textContent = scores.p;
  cScoreEl.textContent = scores.c;
  tScoreEl.textContent = scores.t;
  // render images 
  pResultEl.style.backgroundImage = `url(${rps[results.p].imgUrl})`;
  cResultEl.style.backgroundImage = `url(${rps[results.c].imgUrl})`;
  // color border if winner, otherwise "hide" the border
  pResultEl.parentElement.style.border = winner === 'p' ? '10px solid darkgrey' : '10px solid white';
  cResultEl.parentElement.style.border = winner === 'c' ? '10px solid darkgrey' : '10px solid white';
}

function getRandomIdx() {
  return Math.floor(Math.random() * 3);
}

