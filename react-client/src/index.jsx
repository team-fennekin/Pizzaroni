import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/Main.jsx';
import Log from './components/Log.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }



  render () {
    return (
      <div>
        <Main />
        <Log />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
