import React, { Component } from 'react';

class OrderAPI extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };

  }

  submitOrder() {
    console.log('OrderAPI:sendOrder()');
  }

  render() {
    return (
      <div id="dominoAPI">
        {'Domino\'s Order API!'}
      </div>
    );
  }
}

export default OrderAPI;
