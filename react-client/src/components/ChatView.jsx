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
      messageToSend: '',
      userTyping: null,
      messages: []
    };

    this.handleMessageTyping = this.handleMessageTyping.bind(this);
    this.handleSendMessageClick = this.handleSendMessageClick.bind(this);

    this.props.socket.on('receiveMessage', function(data) {
      appendMessage(data);
    });

    const appendMessage = message => {
      this.setState({
        messages: [...this.state.messages, message]
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

  render() {
    return (
      <div id="chat">
       <h1>{this.state.username}'s chat: </h1>
        <div className="messageArea">
          <div className="messages">
           {this.state.messages.map(message => {
            return (
              <p className="message">{message.username}: {message.message}</p>
            )
            })}
           <NotificationArea userTyping={this.state.userTyping} />
          </div>
        </div>
        <input type="text" placeholder="Message" className="message-form" value={this.state.messageToSend} onChange={this.handleMessageTyping}/>
        <button onClick={this.handleSendMessageClick}>Send Message</button>
      </div>
    );
  }
}
export default ChatView;