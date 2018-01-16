import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import $ from 'jquery';
import io from 'socket.io-client';
import Pizza from './components/Pizza.jsx';
import ChatView from './components/ChatView.jsx';
import Log from './components/Log.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      roomID: 'lobby',
      userToppings: [],
      friendToppings: [],
      numberOfUsers: 0
    };

    this.socket = io.connect();
  }

  componentDidMount() {
    let username = prompt("Welcome! Please choose a username: ");
    let password = prompt(`Welcome, ${username}, please choose a password:`);
    
    let userData = {
      username: username,
      password: password
    }

    $.ajax({
      url: `/users/${username}`,
      method: 'POST',
      data: JSON.stringify(password),
      contentType: 'application/json',
      sucess: (data) => {
        console.log(`Successfully added ${username} to the database`, data);
        this.setState({
          username: username,
          numberOfUsers: 1
        });
      },
      error: (err) => {
        console.log(err);
      }
    });

    this.socket.emit('addUser', username);
  }

  render () {
    return (
      <div>
        <Pizza socket={this.socket}/>
        <ChatView roomID={this.state.roomID} username={this.state.username} socket={this.socket}/>
        <Log />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
