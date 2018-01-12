import React from 'react';

import Sizes from './Sizes.jsx';
import Toppings from './Toppings.jsx';
import Crusts from './Crusts.jsx';

class Pizza extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      size: '',
      crust: '',
      toppings: {}
    };
  }

  render() {
    return (
      <div id="pizza">
        <Sizes />
        <Crusts />
        <Toppings />
      </div>
    );
  }
}

export default Pizza;
