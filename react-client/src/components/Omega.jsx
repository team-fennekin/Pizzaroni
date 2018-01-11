import React from 'react';
import $ from 'jquery';

class Omega extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.state.toppings = [];

    this.getAllToppings = this.getAllToppings.bind(this);
  }

  getAllToppings() {
    const that = this;
    $.ajax({
      url: '/toppings',
      method: 'GET',
      success: function(data) {
        console.log(data);
        that.setState({
          toppings: data
        })
      }
    });
  }


  render() {
    return (
      <div>
      <h1 onClick={this.getAllToppings}>Hello</h1>
      </div>
    );
  }
}

export default Omega;
