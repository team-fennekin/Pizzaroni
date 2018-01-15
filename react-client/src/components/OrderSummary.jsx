import React from 'react';

const OrderSummary = (props) => (
  <div id="order-summary">
    <h2>Order Summary</h2>

    <div id="pizza-view-size">
      Size: {props.size}
    </div>

    <div id="pizza-view-crust">
      Crust: {props.crust}
    </div>

    <div id="pizza-view-toppings">
      Toppings:
      <ul>
        {props.toppings.map(topping =>
          <li key={topping.id}>{topping.name}</li>
        )}
      </ul>
    </div>

  </div>
)

export default OrderSummary;
