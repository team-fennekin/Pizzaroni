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

function Chatbanner(props) {
  if (!props.username) {
    return null;
  } else if (props.username[props.username.length - 1] === 's') {
    return <h3 id="banner">{props.username}' chat</h3>
  } else {
    return <h3 id="banner">{props.username}'s chat</h3>
  }
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
    this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
    // this.handleSwitchRoomClick = this.handleSwitchRoomClick.bind(this);

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

    // this.props.socket.on('receiveRoomInvite', function(newRoom) {
    //   // console.log('got the message', newRoom);
    //   switchRoom(newRoom);
    // });

    this.props.socket.on('inviteAccepted', (userAccepting, newRoom) => {
      // console.log('the new room ID is ', newRoom);
      this.setState({
        roomID: newRoom
      }, function() {
        this.props.socket.emit('switchRoom', this.state.roomID);
        this.props.handleRoomSwitch(this.state.roomID);
        alert(`${userAccepting} has accepted your invite. Let's make a pizza together!`);
      });
    });

    this.props.socket.on('receiveRoomInvite', (userSendingInvite, sockedIDofUserSendingInvite) => {
      // console.log('got the message', newRoom);
      let acceptedOrDeclined = confirm(`${userSendingInvite} has invited you to share a pizza with them! Do you accept?`);
      if (acceptedOrDeclined === true) {
        let generateNewRoomID = () => {
          let m = 9;
          let s = '';
          let r = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
          for (let i=0; i < m; i++) {
            s += r.charAt(Math.floor(Math.random()*r.length));
          }
          return s;
        };

        this.setState({
          roomID: generateNewRoomID()
        }, function() {
          this.props.socket.emit('switchRoom', this.state.roomID);
          this.props.handleRoomSwitch(this.state.roomID);
          this.props.socket.emit('acceptInvite', this.props.username, sockedIDofUserSendingInvite, this.state.roomID);
        });
      } else {
        this.props.socket.emit('declineInvite', this.props.username, sockedIDofUserSendingInvite);
      }

    });

    this.props.socket.on('inviteDeclined', (userDeclining) => {
      alert(`Sorry, ${this.props.username}, but ${userDeclining} has declined.`)
    });



    // const switchRoom = (newRoom) => {
    //   this.setState({
    //     roomID: newRoom
    //   }, function() {
    //     this.props.handleRoomSwitch(this.state.roomID);
    //     this.props.socket.emit('switchRoom', this.state.roomID);
    //   });
    // }

    this.props.socket.on('clearMessages', () => {
      // console.log('Getting the clear messages event');
      this.setState({
        messages: []
      });
    });
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

  handleMessageSubmit(e){
    if (e.key === 'Enter') {
      this.handleSendMessageClick(e);
    }
  }

  handleUserNameClick(e) {
    if (e.target.getAttribute("value") !== this.state.username && this.state.roomID === 'lobby') {

      let usernameToInvite = e.target.getAttribute("value");
      let userInfoToInvite = this.state.roomUsers[usernameToInvite];
      let socketIDtoInvite = this.state.roomUsers[usernameToInvite][1];
      let sendInvite = confirm(`Would you like to invite ${usernameToInvite} to share a pizza with you?`);
      if (sendInvite === true) {
        this.props.socket.emit('inviteUser', this.state.username, socketIDtoInvite);
      }

      // let generateNewRoomID = function() {
      //   let m = 9;
      //   let s = '';
      //   let r = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      //   for (let i=0; i < m; i++) {
      //     s += r.charAt(Math.floor(Math.random()*r.length));
      //   }
      //   return s;
      // };

      // this.setState({
      //   roomID: generateNewRoomID()
      // }, function() {
      //   this.props.socket.emit('switchRoom', this.state.roomID);
      //   this.props.handleRoomSwitch(this.state.roomID);
      // });
    }
  }

  // BELOW CODE WAS USED TO TEST SWITCHING TO NEW ROOMS MANUALLY

  // handleSwitchRoomClick(e) {
  //   // console.log(e.target);
  //   let newRoomName = prompt('Please enter the name of your new room: ');
  //   this.setState({
  //     roomID: newRoomName
  //   });
  //   this.props.socket.emit('switchRoom', newRoomName);
  // }

  render() {
    return (
      <div id="chat">
        <Chatbanner username={this.state.username} />
        <div className="ez">
          <h3>Active users for this room:</h3>

          <ul className="roomUsers">
            {Object.keys(this.state.roomUsers).map((username, index) => {
              return <li key={index} value={username} onClick={this.handleUserNameClick}>{username}</li>
            })}
          </ul>
        </div>

        <div className="messageArea">
          <div className="messages">
           {this.state.messages.map((message, i) => {
              if (message.username === 'SERVER') {
                // console.log('hello');
                return (
                   <p className="message" key={i}>{message.message}</p>
                )
              } else {
                return (
                  <p className="message" key={i}>{message.username}: {message.message}</p>
                )
              }
            })}
           <NotificationArea userTyping={this.state.userTyping} />
          </div>
        </div>
        <input type="text" placeholder="Message" className="message-form" value={this.state.messageToSend} onChange={this.handleMessageTyping} onKeyDown={this.handleMessageSubmit} />
        <button id='BAD' onClick={this.handleSendMessageClick}>Send Message</button>
      </div>
    );
  }
}
export default ChatView;
