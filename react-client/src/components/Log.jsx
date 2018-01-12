import React from 'react';
import ReactDOM from 'react-dom';

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

        <h2>Username</h2>
        <input />
        <h2>Password</h2>
        <input />
        <button></button>
      </div>
    );
  }
}


ReactDOM.render(<Log />, document.getElementById('log'));
