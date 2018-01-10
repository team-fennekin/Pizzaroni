import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      toppings: [{name: 'Pepperoni', price: 2}, {name: 'Mushrooms', price: 1}, {name: 'Bell Peppers', price: 1.25}],

      sizes: [{name: 'Small', price: 15}, {name: 'Medium', price: 20}, {name: 'Large', price: 25}],
      selectedSize: null,

      crusts: [{name: 'Pan Pizza', price: 3}, {name: 'Deep Dish', price: 5}, {name: 'Neapolitan', price: 4}],
      selectedCrust: null
    }
    this.handleSizeChange = this.handleSizeChange.bind(this);
    this.handleCrustChange = this.handleCrustChange.bind(this);
  }
  
  // componentDidMount() {
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
  handleSizeChange(e) {
    this.setState({selectedSize: e.target.value})
  }

  handleCrustChange(e) {
    this.setState({selectedCrust: e.target.value})
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
              <div>{topping.name}: {topping.price}</div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));