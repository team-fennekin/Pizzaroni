import React from 'react';
import ReactDOM from 'react-dom';
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
      roomID: null,
      selectedToppings: [],
      numberOfUsers: 0
    };

    this.handleToppingsUpdate = this.handleToppingsUpdate.bind(this);

    this.socket = io.connect();
  }

  componentDidMount() {
    let username = prompt("Welcome! Please choose a username: ");
    this.setState({
      username: username,
      numberOfUsers: 1
    });

    // below adds room ID
    let roomID = function() {
      let m = 9; 
      let s = '';
      let r = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for (var i=0; i < m; i++) {
        s += r.charAt(Math.floor(Math.random()*r.length));
      }
      return s;
    };

    this.setState({
      roomID: roomID()
    });
  }

  render () {
    return (
      <div>
        <Pizza socket={this.socket}/>
        <ChatView username={this.state.username} socket={this.socket}/>
        <Log />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
