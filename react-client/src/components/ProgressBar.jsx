import React from 'react';

const ProgressBar = (props) => (
  <div id="progress-bar">
    <h2>Progress Bar</h2>
    <div id={(props.currentStep > 0) ? 'completed' : 'not-completed'}>Size</div>
    <div id={(props.currentStep > 1) ? 'completed' : 'not-completed'}>Crust</div>
    <div id={(props.currentStep > 2) ? 'completed' : 'not-completed'}>Toppings</div>

    <div id="next-button">
      <button onClick={props.nextOption}>Next</button>
    </div>

    <div id="back-button">
      <button onClick={props.backOption}>Back</button>
    </div>
  </div>
)

export default ProgressBar;
