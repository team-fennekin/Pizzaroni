import React from 'react';

class Log extends React.Component  {
  constructor(props) {
    super(props);

    this.state = {

    };

    this.sendRequest = this.sendRequest.bind(this);
  }

  sendRequest() {
    
  }

  render() {
    return (
      <div>
        <h1>Try to not get hit by rainbows</h1>
        <h2>Username</h2>
        <input />
        <h2>Password</h2>
        <input />
        <button onClick={this.sendRequest}>Submit</button>
        <img src='fat_unicorn.png'/>
        <img src='big_white_unicorn.jpg'/>
        <img src='sad_unicorn.png'/>
        <img src='white_unicorn.jpg'/>
      </div>
    );
  }
}
export default Log;
