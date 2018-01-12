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

      toppings: [],
      selectedToppings: {},

      sizes: [],
      selectedSize: '',

      crusts: [],
      selectedCrust: '',

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
        // <div id="options">
        //
        //   <h2>Options</h2>
        //
        // </div>
        //
        // <div id="pizza-view">
        //
        //   <h2>Pizza View</h2>
        //
        //   <div id="pizza-view-size">
        //     Size: {this.state.selectedSize || 'Select a size above!'}
        //   </div>
        //
        //   <div id="pizza-view-crust">
        //     Crust: {this.state.selectedCrust || 'Select a crust above!'}
        //   </div>
        //
        //   <div id="pizza-view-toppings">
        //     Toppings:
        //     Cheese
        //     {Object.keys(this.state.selectedToppings).map((topping) =>
        //       {if(this.state.selectedToppings[topping]) {
        //         return <div>{topping}</div>
        //       }}
        //     )}
        //   </div>
        //
        // </div>
        //
        // <div id="subtotal">
        //   {this.state.subtotal.toLocaleString('en-US', {style:'currency', currency: 'USD'})}
        // </div>
        //
        // <div id="submitButton">
        //   <form onSubmit={this.handleSubmit}>
        //     <input type="submit" value="Submit Order"></input>
        //   </form>
        // </div>

      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
