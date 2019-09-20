import React from 'react';
import GuessRow from '../GuessRow/GuessRow';
import styles from './GameBoard.module.css';

const GameBoard = (props) => (
  <div className={styles.GameBoard}>
    {props.guesses.map((guess, idx) =>
      <GuessRow
        guess={guess}
        colors={props.colors}
        rowIdx={idx}
        currentGuess={idx === (props.guesses.length - 1)}
        handlePegClick={props.handlePegClick}
        handleScoreClick={props.handleScoreClick}
        key={idx}
      />
    )}
  </div>
);

export default GameBoard;
