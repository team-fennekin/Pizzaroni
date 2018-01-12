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
          that.setState({selectedSize: that.state.sizes[1].name});
          console.log(that.state.selectedSize);
        });
      }
    });
  }

  handleSizeChange(event) {
    this.setState({selectedSize: event.target.value})
    console.log(this.state.selectedSize);
  }

  render() {
    return (
      <div id="size">
       <h1>{this.state.selectedSize}</h1>
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
