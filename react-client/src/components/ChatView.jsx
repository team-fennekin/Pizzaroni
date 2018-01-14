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
  }

  handleSendMessageClick(e) {
    console.log(this.props.socket);
    e.preventDefault();
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