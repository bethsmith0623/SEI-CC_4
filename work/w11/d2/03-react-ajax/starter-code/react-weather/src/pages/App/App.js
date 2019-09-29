import React, { Component } from 'react';
import './App.css';
import Map from '../../components/Map/Map';

class App extends Component {

  render() {
    return (
      <div className='App'>
        <Map />
        <header className='App-header'>REACT WEATHER</header>
      </div>
    );
  }

}

export default App;
