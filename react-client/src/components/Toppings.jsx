import React from 'react';
import $ from 'jquery';

class Toppings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      toppings: [],
      selectedToppings: {}
    };

    this.getAllToppings = this.getAllToppings.bind(this);
    this.handleToppingChange = this.handleToppingChange.bind(this);
    this.getAllToppings();
  }

  getAllToppings() {
    const that = this;
    $.ajax({
      url: '/toppings',
      method: 'GET',
      success: function(data) {
        that.setState({
          toppings: data
        });
      },
      error: function(err) {
        console.log('error');
      }
    });
  }

  handleToppingChange(event) {
    var idx = event.target.value;
    if (this.state.selectedToppings.hasOwnProperty(idx)) {
      delete this.state.selectedToppings[idx];
    } else {
      this.state.selectedToppings[idx] = this.state.toppings[idx];
    }
    this.props.onChange(this.state.selectedToppings);
  }

  render() {
    return (
      <div id="toppings">
        {this.state.toppings.map((topping, idx) =>
          <label>
            <input type="checkbox" value={idx} checked={this.state.selectedToppings[idx]} onChange={this.handleToppingChange}/>
            {topping.name}
          </label>
        )}
      </div>
    );
  }
}

export default Toppings;
