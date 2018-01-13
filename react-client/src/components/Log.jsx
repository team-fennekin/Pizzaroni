import React from 'react';

class Log extends React.Component  {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div>
        <img src='fat_unicorn.png'/>
        <img src='big_white_unicorn.jpg'/>
        <img src='sad_unicorn.png'/>
        <img src='white_unicorn.jpg'/>
        <h1>Try to not get hit by rainbows</h1>
        <h2>Username</h2>
        <input />
        <h2>Password</h2>
        <input />
        <button></button>
      </div>
    );
  }
}

export default Log;
