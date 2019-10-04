import React, {Component} from 'react';
import './App.css';
import {Route, NavLink} from 'react-router-dom';
// The following imports all named exports attached to puppyAPI
import * as puppyAPI from '../../services/puppies-api';
import PuppyListPage from '../../pages/PuppyListPage/PuppyListPage';
import AddPuppyPage from '../../pages/AddPuppyPage/AddPuppyPage';
import EditPuppyPage from '../../pages/EditPuppyPage/EditPuppyPage';

class App extends Component {
  state = {
    puppies: []
  };

  handleAddPuppy = async newPupData => {
    const newPup = await puppyAPI.create(newPupData);
    this.setState(state => ({
      puppies: [...state.puppies, newPup]
    }), () => this.props.history.push('/'));
  }

  handleUpdatePuppy = async updatedPupData => {
    const updatedPuppy = await puppyAPI.update(updatedPupData);
    const newPuppiesArray = this.state.puppies.map(p => 
      p._id === updatedPuppy._id ? updatedPuppy : p
    );
    this.setState(
      {puppies: newPuppiesArray},
      // Using cb to wait for state to update before rerouting
      () => this.props.history.push('/')
    );
  }

  handleDeletePuppy= async id => {
    await puppyAPI.deleteOne(id);
    this.setState(state => ({
      // Yay, filter returns a NEW array
      puppies: state.puppies.filter(p => p._id !== id)
    }), () => this.props.history.push('/'));
  }

  /*--- Lifecycle Methods ---*/

  async componentDidMount() {
    const puppies = await puppyAPI.getAll();
    this.setState({puppies});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          React Puppies CRUD
          <nav>
            <NavLink exact to='/'>PUPPIES LIST</NavLink>
            &nbsp;&nbsp;&nbsp;
            <NavLink exact to='/add'>ADD PUPPY</NavLink>
          </nav>
        </header>
        <main>
          <Route exact path='/' render={({history}) => 
            <PuppyListPage
              puppies={this.state.puppies}
              handleDeletePuppy={this.handleDeletePuppy}
            />
          } />
          <Route exact path='/add' render={() => 
            <AddPuppyPage
              handleAddPuppy = {this.handleAddPuppy}
            />
          } />
          <Route exact path='/edit' render={({history, location}) => 
            <EditPuppyPage
              handleUpdatePuppy={this.handleUpdatePuppy}
              location={location}
            />
          } />
        </main>
      </div>
    );
  }
}

export default App;
