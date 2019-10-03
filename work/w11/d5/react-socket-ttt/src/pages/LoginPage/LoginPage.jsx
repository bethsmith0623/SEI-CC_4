import React, { Component } from 'react';
import userService from '../../services/userService';

class LoginPage extends Component {
  
  state = {
    email: '',
    pw: ''
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userService.login(this.state);
      this.props.handleSignupOrLogin();
      this.props.history.push('/');
    } catch (error) {
      alert(error.message);
    }
  }

  render() {
    return (
      <div className='page'>
        <h2>Log In</h2>
        <form onSubmit={this.handleSubmit}>
          <label>Email:</label>
          <input type="email" placeholder="Email" value={this.state.email} name="email" onChange={this.handleChange} />
          <label>Password:</label>
          <input type="password" placeholder="Password" value={this.state.pw} name="pw" onChange={this.handleChange} />
          <label></label>
          <button type='submit'>Log In</button>
        </form>
      </div>
    );
  }
};

export default LoginPage;