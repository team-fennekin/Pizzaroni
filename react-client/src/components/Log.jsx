import React from 'react';

class Log extends React.Component  {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };

    this.sendRequest = this.sendRequest.bind(this);
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.saveUser = this.saveUser.bind(this);
  }

  sendRequest() {
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
      url: `/users/${username}`,
      method: 'POST',
      data: JSON.stringify({password: this.state.password}),
      contentType: 'application/json',
      success: (data) => {
        console.log(data);
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
          <label htmlFor="username" type="text">Username</label>
          <input id="username" onChange={this.onUsernameChange} />
          <label htmlFor="password" type="password">Password</label>
          <input id="password" onChange={this.onPasswordChange} />
          <button onClick={this.sendRequest}>Sign Up</button>
          <button onClick={this.sendRequest}>Sign In</button>
        </div>
        <img id="leftUnicorn" src='pictures/fat_unicorn.png'/>
        <img id="rightUnicorn" src='pictures/sad_unicorn.png'/>
      </div>
    );
  }
}
export default Log;
