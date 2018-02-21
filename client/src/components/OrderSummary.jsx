import React from 'react';

const OrderSummary = (props) => {
  // console.log(props.socket);

  let myToppingsTitle = null;
  let friendsToppingsTitle = null;
  let ftops = null;
  if(props.numberOfUsers === 1) {
    myToppingsTitle = 'Toppings'
  } else {
    myToppingsTitle = `${props.username}'s toppings`;
    friendsToppingsTitle = `${props.friendUsername}'s toppings`;
    ftops = <ul>{props.friendToppings.map(topping =>
      <li key={topping.id}>{topping.name}</li>
    )}</ul>;
  }

  return (
    <div id="order-summary">
      <h2>{props.summaryTitle}</h2>

      <div id="pizza-view-size">
        Size: {props.size}
      </div>

      <div id="pizza-view-crust">
        Crust: {props.crust}
      </div>


      <div id="pizza-view-toppings">

        {myToppingsTitle}
        <ul>
          {props.toppings.map(topping =>
            <li key={topping.id}>{topping.name}</li>
          )}
        </ul>
        {friendsToppingsTitle}
        {ftops}
      </div>



      <div id="subtotal">
        Sub-total: {(props.subtotal).toLocaleString('en-US', {style: 'currency', currency: 'USD'})}
      </div>

    </div>
  )}

export default OrderSummary;
