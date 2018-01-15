import React from 'react';

class ProgressBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 0
    };
    this.next = this.next.bind(this);
    this.back = this.back.bind(this);
  }

  next() {
    this.setState((prevState) => (prevState.currentStep < 3) ? {currentStep: prevState.currentStep + 1} : null);
  }

  back() {
    this.setState((prevState) => (prevState.currentStep >= 1) ? {currentStep: prevState.currentStep - 1} : null);
  }

  render() {
    return (
      <div id="progress-bar">
        <h2>Progress Bar</h2>
        <div id={(this.state.currentStep > 0) ? 'completed' : 'not-completed'}>Size</div>
        <div id={(this.state.currentStep > 1) ? 'completed' : 'not-completed'}>Crust</div>
        <div id={(this.state.currentStep > 2) ? 'completed' : 'not-completed'}>Toppings</div>

        <div id="next-button">
          <button onClick={this.next}>Next</button>
        </div>

        <div id="back-button">
          <button onClick={this.back}>Back</button>
        </div>
      </div>
    )
  }
}

export default ProgressBar;
