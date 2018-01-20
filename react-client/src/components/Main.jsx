import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import io from 'socket.io-client';
import Pizza from './Pizza.jsx';
import ChatView from './ChatView.jsx';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      password: this.props.password,
      userId: this.props.userId,
      roomID: 'lobby',
      numberOfUsers: 1
    };
    console.log('CURRENT USER ID', this.props.userId);
    this.handleRoomSwitch = this.handleRoomSwitch.bind(this);
    this.socket = io.connect();
  }

  componentDidMount() {
    this.socket.emit('addUser', this.state.username);
  }

  handleRoomSwitch(newRoomID) {
    // console.log('This is the friends username ', usernameOfFriend);
    // console.log('main app now knows there has been a switch out of the lobby');
    this.setState({
      numberOfUsers: 2,
      roomID: newRoomID
    });
  }

  render () {
    return (
      <div>
        <Pizza username={this.state.username} socket={this.socket} numberOfUsers={this.state.numberOfUsers} roomID={this.state.roomID} />
        <ChatView roomID={this.state.roomID} username={this.state.username} socket={this.socket} handleRoomSwitch={this.handleRoomSwitch} />
      </div>
    );
  }
}

export default Main;
