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
      data: JSON.stringify(this.state.password),
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
      <div>
        {this.state.username} {this.state.password}
        <h1>Try to not get hit by rainbows</h1>
        <h2>Username</h2>
        <input onChange={this.onUsernameChange} />
        <h2>Password</h2>
        <input onChange={this.onPasswordChange} />
        <button onClick={this.sendRequest}>Submit</button>
        <img id="leftUnicorn" src='pictures/fat_unicorn.png'/>
        <img id="leftUnicorn" src='pictures/sad_unicorn.png'/>
        <img id="leftUnicorn" src='pictures/justMonica.jpg'/>
      </div>
    );
  }
}
export default Log;
