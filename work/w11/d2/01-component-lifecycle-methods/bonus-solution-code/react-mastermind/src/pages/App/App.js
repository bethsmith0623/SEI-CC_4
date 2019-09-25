import React, { Component } from 'react';
import './App.css';
import GamePage from '../../pages/GamePage/GamePage';
import { Route, Switch } from 'react-router-dom';
import SettingsPage from '../SettingsPage/SettingsPage';

const colors = {
  Easy: ['#7CCCE5', '#FDE47F', '#E04644', '#B576AD'],
  Moderate: ['#7CCCE5', '#FDE47F', '#E04644', '#B576AD', '#B7D968'],
  Difficult: ['#7CCCE5', '#FDE47F', '#E04644', '#B576AD', '#B7D968', '#555E7B']
};

class App extends Component {
  constructor() {
    super();
    this.state = {...this.getInitialState(), difficulty: 'Easy'};
  }

  getInitialState() {
    return {
      selColorIdx: 0,
      guesses: [this.getNewGuess()],
      code: this.genCode(),
      // new state coming in!
      elapsedTime: 0,
      isTiming: true
    };
  }

  getNewGuess() {
    return {
      code: [null, null, null, null],
      score: {
        perfect: 0,
        almost: 0
      }
    };
  }

  genCode() {
    let numColors = this.state && colors[this.state.difficulty].length;
    numColors = numColors || 4;
    return new Array(4).fill().map(dummy => Math.floor(Math.random() * numColors));
  }

  getWinTries() {
    // if winner, return num guesses, otherwise 0 (no winner)
    let lastGuess = this.state.guesses.length - 1;
    return this.state.guesses[lastGuess].score.perfect === 4 ? lastGuess + 1 : 0;
  }

  handleTimerUpdate = () => {
    this.setState((curState) => ({elapsedTime: ++curState.elapsedTime}));
  }

  handleDifficultyChange = (level) => {
    this.setState({difficulty: level, ...this.getInitialState()});
  }

  handleColorSelection = (colorIdx) => {
    this.setState({selColorIdx: colorIdx});
  }

  handleNewGameClick = () => {
    this.setState(this.getInitialState());
  }

  handlePegClick = (pegIdx) => {
    // Get index of last guess object
    let currentGuessIdx = this.state.guesses.length - 1;

    // Always replace objects/arrays with NEW ones
    let guessesCopy = [...this.state.guesses];
    let guessCopy = {...guessesCopy[currentGuessIdx]};
    let codeCopy = [...guessCopy.code];

    // Update the NEW code array with the currently selected color
    codeCopy[pegIdx] = this.state.selColorIdx;

    // Update the NEW guess object
    guessCopy.code = codeCopy;

    // Update the NEW guesses array
    guessesCopy[currentGuessIdx] = guessCopy;

    // Update state with the NEW guesses array
    this.setState({
        guesses: guessesCopy
    });
  }

  handleScoreClick = () => {
    // Need the index of the current guess object (last object in guesses array)
    let currentGuessIdx = this.state.guesses.length - 1;

    // Create "working" copies of the "guessed" code and the secret
    // code so that we can modify them as we compute the number of
    // perfect and almost without messing up the actual ones in state
    let guessCodeCopy = [...this.state.guesses[currentGuessIdx].code];
    let secretCodeCopy = [...this.state.code];

    let perfect = 0, almost = 0;

    // First pass computes number of "perfect"
    guessCodeCopy.forEach((code, idx) => {
      if (secretCodeCopy[idx] === code) {
        perfect++;
        // Ensure same choice is not matched again
        // by updating both elements in the "working"
        // arrays to null
        guessCodeCopy[idx] = secretCodeCopy[idx] = null;
      }
    });

    // Second pass computes number of "almost"
    guessCodeCopy.forEach((code, idx) => {
      if (code === null) return;
      let foundIdx = secretCodeCopy.indexOf(code);
      if (foundIdx > -1) {
        almost++;
        // Again, ensure same choice is not matched again
        secretCodeCopy[foundIdx] = null;
      }
    });

    // State must only be updated with NEW objects/arrays
        // Always replace objects/arrays with NEW ones
    let guessesCopy = [...this.state.guesses];
    let guessCopy = {...guessesCopy[currentGuessIdx]};
    let scoreCopy = {...guessCopy.score};

    scoreCopy.perfect = perfect;
    scoreCopy.almost = almost;
    guessCopy.score = scoreCopy;
    guessesCopy[currentGuessIdx] = guessCopy;

    if (perfect !== 4) guessesCopy.push(this.getNewGuess());

    this.setState({
      guesses: guessesCopy,
      // This is a great way to update isTiming
      isTiming: perfect !== 4
    });
  }

  render() {
    let winTries = this.getWinTries();
    return (
      <div>
        <header className='header-footer'>R E A C T &nbsp;&nbsp;&nbsp;  M A S T E R M I N D</header>
        <Switch>
          <Route exact path='/' render={() =>
            <GamePage
              winTries={winTries}
              colors={colors[this.state.difficulty]}
              selColorIdx={this.state.selColorIdx}
              guesses={this.state.guesses}
              elapsedTime={this.state.elapsedTime}
              isTiming={this.state.isTiming}
              handleColorSelection={this.handleColorSelection}
              handleNewGameClick={this.handleNewGameClick}
              handlePegClick={this.handlePegClick}
              handleScoreClick={this.handleScoreClick}
              handleTimerUpdate={this.handleTimerUpdate}
            />
          } />
          <Route exact path='/settings' render={props => 
            <SettingsPage
              {...props} 
              colorsLookup={colors}
              difficulty={this.state.difficulty}
              handleDifficultyChange={this.handleDifficultyChange}
            />
          } />
        </Switch>
      </div>
    );
  }
}

export default App;
