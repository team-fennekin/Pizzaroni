import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Pizza from './components/Pizza.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      roomID: null,
      numberOfUsers: null,

      subtotal: 0
    }
  }

  // componentWillMount() {
  //
  //   this.setState((prevState) => {
  //     return {toppings: prevState.toppings.concat(dummyToppings)};
  //   });
  //
  //   // let objectOfToppings = {};
  //   // console.log(this.state.toppings[0]);
  //
  //   // for (var i = 0; i < this.state.toppings.length; i++) {
  //   //   console.log(this.state.toppings[i]);
  //   //   // objectOfToppings[this.state.toppings[i].name]: false
  //   //   // this.setState({
  //   //   //   selectedToppings: objectOfToppings
  //   //   // });
  //   // }
  // }

  // componentDidMount() {
  //   // console.log(this.state.toppings[0]);
  //   let objectOfToppings = {};
  //   for (var i = 0; i < this.state.toppings.length; i++) {
  //     // console.log(this.state.toppings[i]);
  //     objectOfToppings[this.state.toppings[i].name] = false;
  //     this.setState({
  //       selectedToppings: objectOfToppings
  //     });
  //   }
  // }

  // componentDidMount() {
  // handleSubmit(e) {
  //   //   $.ajax({
  //   //     url: '/items',
  //   //     success: (data) => {
  //   //       this.setState({
  //   //         items: data
  //   //       })
  //   //     },
  //   //     error: (err) => {
  //   //       console.log('err', err);
  //   //     }
  //   //   });
  //   // }
  //   alert("Your pizza is being prepped!");
  //   e.preventDefault();
  // }

  render () {
    return (
      <div>
        <Pizza />
        
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
