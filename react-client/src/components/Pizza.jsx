import React from 'react';
import $ from 'jquery';

import Sizes from './Sizes.jsx';
import Crusts from './Crusts.jsx';
import Toppings from './Toppings.jsx';
import OrderSummary from './OrderSummary.jsx';
import PizzaPicture from './PizzaPicture.jsx';
import ProgressBar from './ProgressBar.jsx';

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
    this.setState({
      toppings: Object.values(toppings)
    }, function() {
      this.countTotal();
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
    var datum = {size: this.state.size, crust: this.state.crust, toppings: this.state.toppings, price: this.state.subtotal};
    console.log(datum);
    $.ajax({
      url: '/save',
      method: 'POST',
      data: JSON.stringify(datum),
      contentType: 'application/json',
      sucess: function(data) {
        console.log('data', data);
      },
      error: function(err) {
        console.log(err);
      }
    });
  }

  render() {
    return (
      <div id="pizza">
        <ProgressBar />

        <div id="options">
          <h1>Pizza Options</h1>
          <Sizes onSizeChange={this.onSizeChange} />
          <Crusts onCrustChange={this.onCrustChange} />
          <Toppings onToppingChange={this.onToppingChange} />
        </div>

        <PizzaPicture size={this.state.size.name} crust={this.state.crust.name} toppings={this.state.toppings} />
        <OrderSummary size={this.state.size.name} crust={this.state.crust.name} toppings={this.state.toppings} subtotal={this.state.subtotal} submitOrder={this.submitOrder} />
        <div id="submitButton">
          <button onClick={this.submitOrder}>Submit</button>
        </div>
      </div>
    );
  }
}

export default Pizza;
