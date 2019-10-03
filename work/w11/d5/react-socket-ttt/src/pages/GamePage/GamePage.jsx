import React from 'react';
import NewGame from '../../components/NewGame/NewGame';
import WaitingForPlayer from '../../components/WaitingForPlayer/WaitingForPlayer';
import PlayGame from '../../components/PlayGame/PlayGame';

function checkIfCurPlayer(game, user) {
  const idx = game.turn === 1 ? 0 : 1;
  return game.players[idx].playerId  === user._id;
}

function GamePage({game, user}) {
  const isCurPlayer = game && game.players.length === 2 && checkIfCurPlayer(game, user);
  return (
    <main className='page'>
      { game ?
        game.players.length === 2 ? 
          <PlayGame game={game} isCurPlayer={isCurPlayer}/>
          :
          <WaitingForPlayer code={game._id}/>
        :
        <NewGame />
      }
    </main>
  );
}

export default GamePage;