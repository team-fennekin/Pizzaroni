import React from 'react';
import $ from 'jquery';

class Sizes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      crusts: [],
      selectedCrust: ''
    };

    this.getAllCrusts = this.getAllCrusts.bind(this);
    this.handleCrustChange = this.handleCrustChange.bind(this);
    this.getAllCrusts();
  }

  getAllCrusts() {
    const that = this;
    $.ajax({
      url: '/crusts',
      method: 'GET',
      success: function(data) {
        that.setState({
          crusts: data
        }, function() {
          that.setState({selectedCrust: that.state.crusts[0].name});
          console.log(that.state.selectedCrust);
        });
      }
    });
  }

  handleCrustChange(event) {
    this.setState({selectedCrust: event.target.value})
  }

  render() {
    return (
      <div id="size">
       <h1>{this.state.selectedCrust}</h1>
       <form>
        {this.state.crusts.map((size) =>
          <label>
            <input type="radio" value={size.name} checked={this.state.selectedCrust === size.name} onChange={this.handleCrustChange}/>
            {size.name}
          </label>
        )}
       </form>
      </div>
    );
  }
}

export default Sizes;
