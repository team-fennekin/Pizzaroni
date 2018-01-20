import React from 'react';
import $ from 'jquery';

class Log extends React.Component  {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      response: 'Please LogIn'
    };

    this.sendRequest = this.sendRequest.bind(this);
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.saveUser = this.saveUser.bind(this);
  }

  sendRequest() {
    console.log(5555);
    this.props.onLog(this.state.username, this.state.password);
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
          <button onClick={this.sendRequest}>Sign In</button>
        </div>
      </div>
    );
  }
}
export default Log;
