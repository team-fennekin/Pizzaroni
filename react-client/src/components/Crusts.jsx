import React from 'react';
import $ from 'jquery';

class Sizes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      crusts: [],
      selectedCrust: {}
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
        });
      }
    });
  }

  componentDidMount() {
    this.props.onChange(this.state.selectedCrust);
  }

  handleCrustChange(event) {
    var selectedCrust = this.state.crusts[event.target.value];
    this.setState({selectedCrust: selectedCrust})
    this.props.onChange(selectedCrust);
  }

  render() {
    return (
      <div id="size">
       <form>
        {this.state.crusts.map((size, idx) =>
          <label>
            <input type="radio" value={idx} checked={this.state.selectedCrust === size.name} onChange={this.handleCrustChange}/>
            {size.name}
          </label>
        )}
       </form>
      </div>
    );
  }
}

export default Sizes;
