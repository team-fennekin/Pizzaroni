import React from 'react';

import Sizes from './components/Sizes.jsx';
import Toppings from './components/Toppings.jsx';
import Crusts from './components/Crusts.jsx';

class Pizza extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };

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
}

export default Pizza;
