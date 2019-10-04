import React from 'react';
import socket from '../../socket';

class NewGame extends React.Component {
  
  state = {code: ''};

  render() {
    return (
      <div>
        <div>
          <label>Enter Invite Code: </label>
          <input className='wide-inp' onChange={(e) => this.setState({code: e.target.value})} />&nbsp;
          <button className='button' onClick={() => socket.joinGame(this.state.code)}>Join</button><br/><br/>
        </div>
        <div>- OR -</div><br/><br/>
        <button className='button' onClick={() => socket.newGame()}>Create New Game</button>
      </div>
    );
  }
}

export default NewGame;