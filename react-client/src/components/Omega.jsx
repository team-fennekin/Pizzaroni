import React from 'react';
import $ from 'jquery';

class Omega extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.state.toppings = [];

    this.getAllToppings = this.getAllToppings.bind(this);
    this.getAllSizes = this.getAllSizes.bind(this);
    this.getAllCrusts = this.getAllCrusts.bind(this);
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

  getAllCrusts() {
    const that = this;
    $.ajax({
      url: '/crusts',
      method: 'GET',
      success: function(data) {
        console.log(data);
        that.setState({
          toppings: data
        })
      }
    });
  }

  getAllSizes() {
    const that = this;
    $.ajax({
      url: '/sizes',
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
      <h1 onClick={this.getAllToppings}>Toppings</h1>
      <h1 onClick={this.getAllCrusts}>Crusts</h1>
      <h1 onClick={this.getAllSizes}>Sizes</h1>
      </div>
    );
  }
}

export default Omega;
