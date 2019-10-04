import React from 'react';
import Board from '../Board/Board';

function getCurPlayer(game) {
  return game.turn === 1 ? game.players[0] : game.players[1];
}

function PlayGame({game, isCurPlayer}) {
  const curPlayer = getCurPlayer(game);
  let msg;
  if (game.winner === null) {
    msg = `${curPlayer.name}'s Turn`;
  } else if (game.winner === 0) {
    msg = `It's a Tie!`;
  } else {
    msg = `${curPlayer.name} Wins!`;
  }
  return (
    <div className='page'>
      <h2>{msg}</h2>
      <Board winner={game.winner} board={game.board} isCurPlayer={isCurPlayer}/>
    </div>
  );
}

export default PlayGame;