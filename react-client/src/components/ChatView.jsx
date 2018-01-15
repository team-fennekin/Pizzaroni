import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';

function NotificationArea(props) {
  if (!props.userTyping) {
    return null;
  }

  return (
    <p className="typing-notification">{props.userTyping} is typing... </p>
  )
}
class ChatView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      roomID: this.props.roomID,
      messageToSend: '',
      userTyping: null,
      messages: [],
      roomUsers: {},
      showPopup: false
    };

    this.handleMessageTyping = this.handleMessageTyping.bind(this);
    this.handleSendMessageClick = this.handleSendMessageClick.bind(this);
    this.handleUserNameClick = this.handleUserNameClick.bind(this);
    this.handleSwitchRoomClick = this.handleSwitchRoomClick.bind(this);

    this.props.socket.on('receiveMessage', function(data) {
      appendMessage(data);
    });

    const appendMessage = message => {
      this.setState({
        messages: [...this.state.messages, message]
      });
    };

    this.props.socket.on('updateRoomUsers', function(data) {
      updateRoomUsers(data);
    });

    const updateRoomUsers = users => {
      this.setState({
        roomUsers: users
      });
    };

    this.props.socket.on('typing', function(user) {
      setUserTyping(user);
    });

    const setUserTyping = user => {
      this.setState({
        userTyping: user
      });
    };

    this.props.socket.on('clearTyping', function() {
      resetUserTyping();
    });

    const resetUserTyping = () => {
      this.setState({
        userTyping: null
      });
    };
    

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.username !== this.state.username) {
      this.setState({
        username: nextProps.username
      });
    }
  }

  handleMessageTyping(e) {
    this.setState({
      messageToSend: e.target.value
    });

    this.props.socket.emit('typing', this.state.username);
  }

  handleSendMessageClick(e) {
    // console.log(this.props.socket);
    e.preventDefault();
    this.props.socket.emit('sendMessage', {
      username: this.state.username,
      message: this.state.messageToSend
    });

    this.props.socket.emit('clearTyping');

    this.setState({
      messageToSend: ''
    });    
  }

  handleUserNameClick(e) {
    // console.log(e.target.getAttribute("value"));
    let usernameToInvite = e.target.getAttribute("value");
    // let generateNewRoomID = function() {
    //   let m = 9;
    //   let s = '';
    //   let r = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    //   for (var i=0; i < m; i++) {
    //     s += r.charAt(Math.floor(Math.random()*r.length));
    //   }
    //   return s;
    // };

    // this.setState({
    //   roomID: generateNewRoomID()
    // });

    if (usernameToInvite !== this.state.username) {
      // console.log('this works!!!');
      // this.props.socket.emit('inviteUser', this.state.username, usernameToInvite);
    }
  }

  handleSwitchRoomClick(e) {
    // console.log(e.target);
    var newRoomName = prompt('Please enter the name of your new room: ');
    this.setState({
      roomID: newRoomName
    });
    this.props.socket.emit('switchRoom', newRoomName);
  }

  render() {
    return (
      <div id="chat">

        <h1>{this.state.username}'s chat</h1>
        <h3>Active users for this room:</h3>
        <ul className="roomUsers">
          {Object.keys(this.state.roomUsers).map((username, index) => {
            // below IF logic ensures only socket usernames and NOT socket IDs are rendered to the userlist
            if (index % 2 === 0) {
              return <li key={index} value={username} onClick={this.handleUserNameClick}>{username}</li>
            }
          })}
        </ul>

        <div className="messageArea">
          <div className="messages">
           {this.state.messages.map((message, i) => {
            return (
              <p className="message" key={i}>{message.username}: {message.message}</p>
            )
            })}
           <NotificationArea userTyping={this.state.userTyping} />
          </div>
        </div>
        <input type="text" placeholder="Message" className="message-form" value={this.state.messageToSend} onChange={this.handleMessageTyping}/>
        <button onClick={this.handleSendMessageClick}>Send Message</button>
        <button onClick={this.handleSwitchRoomClick}>Switch to New Room</button>
      </div>
    );
  }
}
export default ChatView;
