import React from 'react';

class Log extends React.Component {
  consructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <div>
        <h1>Try to not get hit by rainbows ;)</h1>
        <img src='../../react-client/dist/big_white_unicorn.jpg' />
        <img src='../../react-client/dist/fat_unicorn.jpg' />
        <img src='../../react-client/dist/sad_unicorn.jpg' />
        <img src='../../react-client/dist/white_unicorn.jpg' />
        <h2>Username</h2>
        <input />
        <h2>Password</h2>
        <input />
        <button>Submit</button>
      </div>
    );
  }
}


extends default Log;
