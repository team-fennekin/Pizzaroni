import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/Main.jsx';
import Log from './components/Log.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      userId: '',
      loggedIn: false
    };

    this.login = this.login.bind(this);
  }

  login(username, password, userId) {
    this.setState({username: username, password: password, loggedIn: true, userId: userId});
  }

  render () {

    let view = null;
    if (this.state.loggedIn) {
      view = <Main username={this.state.username} password={this.state.password} userId={this.state.userId}/>;
    } else {
      view = <Log onLog={this.login} />
    }

    return (
      <div>
        {view}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
