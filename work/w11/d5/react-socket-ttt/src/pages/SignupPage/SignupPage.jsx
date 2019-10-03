import React, { Component } from 'react';
import userService from '../../services/userService';

class SignupPage extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    passwordConf: ''
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    await userService.signup(this.state);
    this.props.handleSignupOrLogin();
    this.props.history.push('/');
  }

  isFormInvalid = () => {
    return !(this.state.name && this.state.email && this.state.password === this.state.passwordConf);
  }

  render() {
    return (
      <div className='page'>
        <h2>Sign Up</h2>
        <form onSubmit={this.handleSubmit} >
          <label>Name:</label>
          <input type="text" placeholder="Name" value={this.state.name} name="name" onChange={this.handleChange} />
          <label>Email:</label>
          <input type="email" placeholder="Email" value={this.state.email} name="email" onChange={this.handleChange} />
          <label>Password:</label>
          <input type="password" placeholder="Password" value={this.state.password} name="password" onChange={this.handleChange} />
          <label>Confirm Password:</label>
          <input type="password" placeholder="Confirm Password" value={this.state.passwordConf} name="passwordConf" onChange={this.handleChange} />
          <label></label>
          <button disabled={this.isFormInvalid()}>Sign Up</button>&nbsp;&nbsp;
        </form>
      </div>
    );
  }

}

export default SignupPage;