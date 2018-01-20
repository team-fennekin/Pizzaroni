import React from 'react';

const ProgressBar = (props) => (
  <div id="progress-bar">
    <h2>Order Progress</h2>
    <div id="bar">
      <div id={(props.currentStep > 0) ? 'completed' : 'not-completed'} class="progress-step size-step">Size</div>
      <div id={(props.currentStep > 1) ? 'completed' : 'not-completed'} class="progress-step crust-step">Crust</div>
      <div id={(props.currentStep > 2) ? 'completed' : 'not-completed'} class="progress-step toppings-step">Toppings</div>

      <div id="next-button">
        <button onClick={props.nextOption} class="progress-button">Next</button>
      </div>

      <div id="back-button">
        <button onClick={props.backOption} class="progress-button">Back</button>
      </div>
    </div>
  </div>
)

export default ProgressBar;
