import React from 'react';
import $ from 'jquery';

import Sizes from './Sizes.jsx';
import Crusts from './Crusts.jsx';
import Toppings from './Toppings.jsx';
import OrderSummary from './OrderSummary.jsx';
import PizzaPicture from './PizzaPicture.jsx';
import ProgressBar from './ProgressBar.jsx';
import OrderAPI from './OrderAPI.jsx';

class Pizza extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: {},
      crust: {},
      toppings: [],
      friendUserData: {},
      friendToppings: [],
      subtotal: 0,
      currentStep: 0,
      numberOfUsers: this.props.numberOfUsers
    };
    this.onSizeChange = this.onSizeChange.bind(this);
    this.onCrustChange = this.onCrustChange.bind(this);
    this.onToppingChange = this.onToppingChange.bind(this);
    this.countTotal = this.countTotal.bind(this);
    this.submitOrder = this.submitOrder.bind(this);
    this.nextOption = this.nextOption.bind(this);
    this.backOption = this.backOption.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.numberOfUsers !== this.state.numberOfUsers) {
      this.setState({
        numberOfUsers: nextProps.numberOfUsers
      });
    }
  }

  onSizeChange(size) {
    this.setState({size: size}, function() {
      this.countTotal();
      this.props.socket.emit('initiateSizeChange', this.state.size);
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
    if (this.state.numberOfUsers === 1) {
      var total = 0;
      total += this.state.size.price;
      total += this.state.crust.price;
      for (var topping of this.state.toppings) {
        total += topping.price;
      }
      this.setState({subtotal: total});
    } else {
      // NEED TO CHANGE THIS CALC LOGIC!
      var total = 0;
      total += this.state.size.price;
      total += this.state.crust.price;
      for (var topping of this.state.toppings) {
        total += topping.price;
      }
      this.setState({subtotal: total});
    }
  }

  nextOption() {
    console.log('next called');
    this.setState((prevState) => (prevState.currentStep < 3) ? {currentStep: prevState.currentStep + 1} : null);
  }

  backOption() {
    this.setState((prevState) => (prevState.currentStep >= 1) ? {currentStep: prevState.currentStep - 1} : null);
  }

  submitOrder() {
    this.saveOrder();
    // this.submitOrder();
  }

  saveOrder() {
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

  submitOrder() {
    OrderAPI.submitOrder();
    console.log('Pizza:submitOrder');
  }

  render() {
    let currentOptionComponent = null;
    if (this.state.currentStep === 0) {
      currentOptionComponent = <Sizes onSizeChange={this.onSizeChange} />;
    } else if (this.state.currentStep === 1) {
      currentOptionComponent = <Crusts onCrustChange={this.onCrustChange} />;
    } else if (this.state.currentStep === 2) {
      currentOptionComponent = <Toppings onToppingChange={this.onToppingChange} />;
    }

    return (
      <div id="pizza">
        <OrderAPI />

        <ProgressBar currentStep={this.state.currentStep}
                     nextOption={this.nextOption}
                     backOption={this.backOption}
                     />

        <div id="options">
          <h1>Pizza Options</h1>
          {currentOptionComponent}
        </div>

        <PizzaPicture size={this.state.size.name}
                      crust={this.state.crust.name}
                      toppings={this.state.toppings}
                      />

        <OrderSummary size={this.state.size.name}
                      crust={this.state.crust.name}
                      toppings={this.state.toppings}
                      subtotal={this.state.subtotal}
                      />

        <div id="submitButton">
          <button onClick={this.submitOrder}>Submit</button>
        </div>
      </div>
    );
  }
}

export default Pizza;
