import React from 'react';

function WaitingForPlayer(props) {
  return (
    <div className='page'>
      <h2>Invite Code to Give to Other Player:</h2>
      <h2 className='accent-text'>{props.code}</h2>
    </div>
  );
}

export default WaitingForPlayer;