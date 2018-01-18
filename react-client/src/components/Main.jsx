import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import io from 'socket.io-client';
import Pizza from './Pizza.jsx';
import ChatView from './ChatView.jsx';
import Log from './Log.jsx';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      roomID: 'lobby',
      numberOfUsers: 1
    };

    this.handleRoomSwitch = this.handleRoomSwitch.bind(this);

    this.socket = io.connect();
  }

  componentDidMount() {
    let username = prompt("Welcome! Please choose a username: ");

    while (username === undefined || username === null || username === '') {
      username = prompt("Sorry, please choose a valid username: ");
    }

    let password = prompt(`Welcome, ${username}, please choose a password:`);

    while (password === undefined || password === null || password === '') {
      password = prompt("Sorry, please choose a valid password: ");
    }

    let userData = {
      password: password
    }

    $.ajax({
      url: `/users/${username}`,
      method: 'POST',
      data: JSON.stringify(userData),
      // dataType: 'jsonp',
      contentType: 'application/json',


      success: (data) => {
        this.setState({
          username: username
        });
      },
      error: (err) => {
        console.log(err);
      }
    });

    this.socket.emit('addUser', username);
  }

  handleRoomSwitch(newRoomID) {
    console.log('main app now knows there has been a switch out of the lobby');
    this.setState({
      numberOfUsers: 2,
      roomID: newRoomID
    });
  }

  render () {
    return (
      <div>
        <Pizza socket={this.socket} numberOfUsers={this.state.numberOfUsers} roomID={this.state.roomID}/>
        <ChatView roomID={this.state.roomID} username={this.state.username} socket={this.socket} handleRoomSwitch={this.handleRoomSwitch}/>
        <Log />
      </div>
    );
  }
}

export default Main;
