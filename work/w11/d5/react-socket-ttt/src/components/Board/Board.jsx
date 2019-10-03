import React from 'react';
import styles from './Board.module.css';
import socket from '../../socket';

const colors = {
  'null': 'white',
  '1': '#46d4d4',
  '-1': '#d885e3'
}



function Board({board, isCurPlayer, winner}) {
  return (
    <section className={styles.board}>
      {board.map((cell, idx) => {
        // Provide undefined as handler if the cell is taken,
        // there's a winner, or if it's not this player's turn
        debugger;
        const clickHandler = (cell || winner || !isCurPlayer) ?
          undefined : () => socket.move(idx);
        return (
          <div
            style={{backgroundColor: colors[cell]}}
            onClick={clickHandler}
            key={idx}
          />
        );
      })}
    </section>
  );
}

export default Board;