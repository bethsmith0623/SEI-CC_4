import React from 'react';
import styles from './GameTimer.module.css';

const GameTimer = (props) => (
  <div className={`${styles.GameTimer} flex-h`}>
    00:00
  </div>
);

export default GameTimer;
