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
      currentSize: '',
      crusts: [{name: 'Pan Pizza', price: 3}, {name: 'Deep Dish', price: 5}, {name: 'Neapolitan', price: 4}]
    }
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


  render () {
    return (
      <div>
        <div id="options">
          <h2>Options</h2>
          <div id="size">
            {this.state.sizes.map((size) => 
              <li>{size.name}</li>
            )}
          </div>
          <ol id="crust">
            {this.state.crusts.map((crust) => 
              <li>{crust.name}</li>
            )}
          </ol>
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