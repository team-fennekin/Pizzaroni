import React from 'react';

import Sizes from './Sizes.jsx';
import Toppings from './Toppings.jsx';
import Crusts from './Crusts.jsx';

class Pizza extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      size: {},
      crust: {},
      toppings: []
    };

    this.onSizeChange = this.onSizeChange.bind(this);
    this.onCrustChange = this.onCrustChange.bind(this);
    this.onToppingChange = this.onToppingChange.bind(this);
  }

  onSizeChange(size) {
    this.setState({size: size});
  }

  onCrustChange(crust) {
    this.setState({crust: crust});
  }

  onToppingChange(toppings) {
    this.setState({toppings: toppings});
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
        </div>
      </div>
    );
  }
}

export default Pizza;
