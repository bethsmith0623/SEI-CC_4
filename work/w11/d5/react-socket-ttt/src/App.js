import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import userService from './services/userService';
import Nav from './components/Nav/Nav';
import GamePage from './pages/GamePage/GamePage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import socket from './socket';

class App extends Component {

  state = { user: null, game: null };

  handleSignupOrLogin = async () => {
    const user = userService.getUser();
    if (user) {
      socket.getActive();
      this.setState({user});
    }
  }

  handleLogout = () => {
    socket.logout();
    userService.logout();
    this.setState({user: null, game: null});
  }

  /*--- Lifecycle Methods */

  async componentDidMount() {
    socket.registerApp(this);
    const user = userService.getUser();
    if (user) {
      socket.getActive();
      this.setState({user});
    }
  }

  render() {
    return (
      <div className="App">
        <Nav
          user={this.state.user}
          game={this.state.game}
          handleLogout={this.handleLogout}
        />
        <Route exact path='/' render={() =>
          this.state.user ? 
            <GamePage user={this.state.user} game={this.state.game} />
            :
            <h2 className='App-msg'>Sign Up or Login<br/>to<br/>Play</h2>
        } />
        <Route exact path='/signup' render={({history}) => 
          <SignupPage
            history={history}
            handleSignupOrLogin={this.handleSignupOrLogin}
            />
          } />
        <Route exact path='/login' render={({history}) => 
          <LoginPage
            history={history}
            handleSignupOrLogin={this.handleSignupOrLogin}
          />
        } />
      </div>
    );
  }
}

export default App;
