import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';

var dummyToppings = [{name: 'Pepperoni', price: 2}, {name: 'Mushrooms', price: 1}, {name: 'Bell Peppers', price: 1.25}]

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toppings: [],
      selectedToppings: {},

      sizes: [{name: 'Small', price: 15}, {name: 'Medium', price: 20}, {name: 'Large', price: 25}],
      selectedSize: null,

      crusts: [{name: 'Pan Pizza', price: 3}, {name: 'Deep Dish', price: 5}, {name: 'Neapolitan', price: 4}],
      selectedCrust: null,

      subtotal: 0
    }
    this.handleSizeChange = this.handleSizeChange.bind(this);
    this.handleCrustChange = this.handleCrustChange.bind(this);
    this.handleToppingClick = this.handleToppingClick.bind(this);
  }

  componentWillMount() {

    this.setState((prevState) => {
      return {toppings: prevState.toppings.concat(dummyToppings)};
    });

    // let objectOfToppings = {};
    // console.log(this.state.toppings[0]);

    // for (var i = 0; i < this.state.toppings.length; i++) {
    //   console.log(this.state.toppings[i]);
    //   // objectOfToppings[this.state.toppings[i].name]: false
    //   // this.setState({
    //   //   selectedToppings: objectOfToppings
    //   // });
    // }
  }

  componentDidMount() {
    // console.log(this.state.toppings[0]);
    let objectOfToppings = {};
    for (var i = 0; i < this.state.toppings.length; i++) {
      // console.log(this.state.toppings[i]);
      objectOfToppings[this.state.toppings[i].name] = false;
      this.setState({
        selectedToppings: objectOfToppings
      });
    }
  }

  // componentDidMount() {

  handleSizeChange(e) {
    this.setState({selectedSize: e.target.value})
  }

  handleCrustChange(e) {
    this.setState({selectedCrust: e.target.value})
  }

  handleToppingClick(e) {
    var clickedTopping = e.target.value;
    var mutateToppings = this.state.selectedToppings;
    mutateToppings[clickedTopping] = !mutateToppings[clickedTopping];
    this.setState({selectedToppings: mutateToppings});
  }

  handleSubmit(e) {
    //   $.ajax({
    //     url: '/items',
    //     success: (data) => {
    //       this.setState({
    //         items: data
    //       })
    //     },
    //     error: (err) => {
    //       console.log('err', err);
    //     }
    //   });
    // }
    console.log('submitted the order');
    alert("Your pizza is being prepped!");
    e.preventDefault();
  }

  render () {
    return (
      <div>
        <div id="options">

          <h2>Options</h2>

          <div id="size">
           <form>
            {this.state.sizes.map((size) =>
              <label>
                <input type="radio" value={size.name} checked={this.state.selectedSize === size.name} onChange={this.handleSizeChange}/>
                {size.name}
              </label>
            )}
           </form>
          </div>

          <div id="crust">
           <form>
            {this.state.crusts.map((crust) =>
              <label>
                <input type="radio" value={crust.name} checked={this.state.selectedCrust === crust.name} onChange={this.handleCrustChange}/>
                {crust.name}
              </label>
            )}
           </form>
          </div>

          <div id="toppings">
            {this.state.toppings.map((topping) =>
              <label>
                <input type="checkbox" value={topping.name} checked={this.state.selectedToppings[topping.name]} onChange={this.handleToppingClick}/>
                {topping.name}
              </label>
            )}
          </div>

        </div>

        <div id="pizza-view">

          <h2>Pizza View</h2>

          <div id="pizza-view-size">
            Size: {this.state.selectedSize || 'Select a size above!'}
          </div>

          <div id="pizza-view-crust">
            Crust: {this.state.selectedCrust || 'Select a crust above!'}
          </div>

          <div id="pizza-view-toppings">
            Toppings:
            Cheese
            {Object.keys(this.state.selectedToppings).map((topping) =>
              {if(this.state.selectedToppings[topping]) {
                return <div>{topping}</div>
              }}
            )}
          </div>

        </div>

        <div id="subtotal">
          {this.state.subtotal.toLocaleString('en-US', {style:'currency', currency: 'USD'})}
        </div>

        <div id="submitButton">
          <form onSubmit={this.handleSubmit}>
            <input type="submit" value="Submit Order"></input>
          </form>
        </div>

      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
