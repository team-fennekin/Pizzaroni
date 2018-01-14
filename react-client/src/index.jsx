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
    this.socket.on('receiveToppingsUpdate', function(toppings) {
      updateCurrentToppings(toppings);
    });

    const updateCurrentToppings = toppings => {
      this.setState({
        selectedToppings: toppings
      });
    }
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

  handleToppingsUpdate(toppings) {
    this.setState({
      selectedToppings: toppings
    }, function() {
      this.socket.emit('sendToppingsUpdate', this.state.selectedToppings);
    });
  }

  render () {
    return (
      <div>
        <Pizza handleToppingsUpdate={this.handleToppingsUpdate}/>
        <ChatView username={this.state.username}/>
        <Log />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
