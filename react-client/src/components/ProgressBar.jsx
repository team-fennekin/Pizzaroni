import React from 'react';

class ProgressBar extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div id="progress-bar">
        <h2>Progress Bar</h2>
        <div id={(this.props.currentStep > 0) ? 'completed' : 'not-completed'}>Size</div>
        <div id={(this.props.currentStep > 1) ? 'completed' : 'not-completed'}>Crust</div>
        <div id={(this.props.currentStep > 2) ? 'completed' : 'not-completed'}>Toppings</div>

        <div id="next-button">
          <button onClick={this.props.nextOption}>Next</button>
        </div>

        <div id="back-button">
          <button onClick={this.props.backOption}>Back</button>
        </div>
      </div>
    )
  }
}

export default ProgressBar;
