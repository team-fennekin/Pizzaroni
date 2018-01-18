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
        <img id="leftUnicorn" src='pictures/fat_unicorn.png'/>
        <img id="leftUnicorn" src='pictures/sad_unicorn.png'/>
      </div>
    );
  }
}
export default Log;
