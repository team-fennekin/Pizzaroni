import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Pizza from './components/Pizza.jsx';
import Log from './components/Log.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      roomID: null,
      numberOfUsers: null
    }
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
