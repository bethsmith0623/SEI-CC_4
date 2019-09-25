import React from 'react';

const NewGameButton = (props) => (
  <button
    className='btn btn-default'
    onClick={props.handleNewGameClick}
  >
    New Game
  </button>
);

export default NewGameButton;
