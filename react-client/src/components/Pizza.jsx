import React from 'react';
import $ from 'jquery';

import Sizes from './Sizes.jsx';
import Toppings from './Toppings.jsx';
import Crusts from './Crusts.jsx';

class Pizza extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      size: {},
      crust: {},
      toppings: [],

      subtotal: 0
    };

    this.onSizeChange = this.onSizeChange.bind(this);
    this.onCrustChange = this.onCrustChange.bind(this);
    this.onToppingChange = this.onToppingChange.bind(this);
    this.countTotal = this.countTotal.bind(this);
  }

  onSizeChange(size) {
    this.setState({size: size}, function() {
      this.countTotal();
    });
  }

  onCrustChange(crust) {
    this.setState({crust: crust}, function() {
      this.countTotal();
    });
  }

  onToppingChange(toppings) {
    this.setState({toppings: Object.values(toppings)}, function() {
      this.state.toppings.map(topping => {
        console.log(topping.name);
        this.countTotal();
      })
    });
  }

  countTotal() {
    var total = 0;
    total += this.state.size.price;
    total += this.state.crust.price;
    for (var topping of this.state.toppings) {
      total += topping.price;
    }

    this.setState({subtotal: total});
  }

  submitOrder() {
    var data = {};
    $.ajax({
      url: '/save',
      method: 'POST',
      data: JSON.stringify('data'),
      sucess: function(data) {
        console.log(data);
      },
      error: function(err) {
        console.log(err);
      }
    });
  }

  render() {
    return (
      <div id="pizza">
        <div id="options">
          <h1>Options</h1>
          <Sizes onChange={this.onSizeChange}/>
          <Crusts onChange={this.onCrustChange}/>
          <Toppings onChange={this.onToppingChange}/>

            <div id="pizza-view">
              <h2>Pizza View</h2>

              <div id="pizza-view-size">
                Size: {this.state.size.name}
              </div>

              <div id="pizza-view-crust">
                Crust: {this.state.crust.name}
              </div>

              <div id="pizza-view-toppings">
                Toppings:
                {this.state.toppings.map(topping => {
                  {topping.name}
                })}
              </div>

            </div>

            <div id="subtotal">
              {this.state.subtotal.toLocaleString('en-US', {style:'currency', currency: 'USD'})}
            </div>

            <div id="submitButton">
              <button onClick={this.submitOrder}>Submit</button>
            </div>
        </div>
      </div>
    );
  }
}

export default Pizza;