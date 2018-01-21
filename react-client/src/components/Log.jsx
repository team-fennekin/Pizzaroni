import React from 'react';
import $ from 'jquery';

class Log extends React.Component  {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      userId: '',
      response: 'Please LogIn'
    };

    this.verifyUser = this.verifyUser.bind(this);
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.saveUser = this.saveUser.bind(this);
  }

  verifyUser() {
    $.ajax({
      url: `/users/${this.state.username}/${this.state.password}`,
      method: 'GET',
      contentType: 'application/json',
      success: (data) => {
        if (data) {
          console.log('Successful logIn');
          this.props.onLog(this.state.username, this.state.password, data);
        } else {
          this.setState({
            response: 'wrong username/password'
          });
        }
      },
      error: (err) => {
        console.log(err);
        this.setState({
          response: 'We are screwed!!!!! GG'
        });
      }
    });
  }

  onUsernameChange(event) {
    this.setState({
      username: event.target.value
    });
  }

  onPasswordChange(event) {
    this.setState({
      password: event.target.value
    });
  }

  saveUser() {
    $.ajax({
      url: `/users/${this.state.username}`,
      method: 'POST',
      data: JSON.stringify({password: this.state.password}),
      contentType: 'application/json',
      success: (data) => {
        this.setState({
          response: 'User Saved!'
        });
        $('#username').val('');
        $('#password').val('');
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  render() {
    return (
      <div id="log">
        <div id="login">
          <h1>{this.state.response}</h1>
          <label htmlFor="username" type="text">Username</label>
          <input id="username" type="text" onChange={this.onUsernameChange} />
          <label htmlFor="password" type="password">Password</label>
          <input id="password" type="password" onChange={this.onPasswordChange} />
          <button onClick={this.saveUser}>Sign Up</button>
          <button onClick={this.verifyUser}>Sign In</button>
        </div>
      </div>
    );
  }
}
export default Log
