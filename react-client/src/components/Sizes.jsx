import React from 'react';
import $ from 'jquery';

class Sizes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sizes: [],
      selectedSize: ''
    };

    this.getAllSizes = this.getAllSizes.bind(this);
    this.handleSizeChange = this.handleSizeChange.bind(this);
    this.getAllSizes();
  }

  getAllSizes() {
    const that = this;
    $.ajax({
      url: '/sizes',
      method: 'GET',
      success: function(data) {
        that.setState({
          sizes: data
        }, function() {
          that.setState({selectedSize: that.state.sizes[2].name});
        });
      }
    });
  }

  handleSizeChange(event) {
    this.setState({selectedSize: event.target.value})
  }

  render() {
    return (
      <div id="size">
       <form>
        {this.state.sizes.map((size) =>
          <label>
            <input type="radio" value={size.name} checked={this.state.selectedSize === size.name} onChange={this.handleSizeChange}/>
            {size.name}
          </label>
        )}
       </form>
      </div>
    );
  }
}

export default Sizes;
