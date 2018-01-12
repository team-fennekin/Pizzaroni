import React from 'react';
import $ from 'jquery';

class Toppings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      toppings: [],
      selectedTopping: ''
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
        }, function() {
          that.setState({selectedTopping: that.state.toppings[0].name});
          console.log(that.state.selectedTopping);
        });
      }
    });
  }

  handleToppingChange(e) {
    var clickedTopping = e.target.value;
    var mutateToppings = this.state.selectedToppings;
    mutateToppings[clickedTopping] = !mutateToppings[clickedTopping];
    this.setState({selectedToppings: mutateToppings});
  }

  render() {
    return (
      <div id="toppings">
        {this.state.toppings.map((topping) =>
          <label>
            <input type="checkbox" value={topping.name} checked={this.state.selectedToppings[topping.name]} onChange={this.handleToppingClick}/>
            {topping.name}
          </label>
        )}
      </div>
    );
  }
}

export default Toppings;
