import React, { Component } from 'react';

const ProgressBar = (props) => (
  <div id="progress-bar">
    <h2>Order Progress</h2>
    <div id="bar">
      <div id={(props.currentStep > 0) ? 'completed' : 'not-completed'} className="progress-step size-step">Size</div>
      <div id={(props.currentStep > 1) ? 'completed' : 'not-completed'} className="progress-step crust-step">Crust</div>
      <div id={(props.currentStep > 2) ? 'completed' : 'not-completed'} className="progress-step toppings-step">Toppings</div>

      <div id="next-button">
        <button onClick={props.nextOption} className="progress-button">Next</button>
      </div>

      <div id="back-button">
        <button onClick={props.backOption} className="progress-button">Back</button>
      </div>
    </div>
  </div>
)

export default ProgressBar;
