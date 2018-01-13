import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Pizza from './components/Pizza.jsx';
import Log from './components/Log.jsx';
import io from 'socket.io-client';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      roomID: null,
      numberOfUsers: 0
    };

    this.socket = io.connect();
  }

  componentDidMount() {
    let user = prompt("Welcome! Please choose a username: ");
    this.setState({
      user: user,
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
        <Pizza />
        <Log />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
