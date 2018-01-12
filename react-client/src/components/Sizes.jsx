import React from 'react';
import $ from 'jquery';

class Sizes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sizes: [],
      selectedSize: {}
    };

    this.getAllSizes = this.getAllSizes.bind(this);
    this.handleSizeChange = this.handleSizeChange.bind(this);
    this.getAllSizes();
  }

  getAllSizes() {
    // const that = this;
    $.ajax({
      url: '/sizes',
      method: 'GET',
      success: (data) => {
        this.setState({
          sizes: data
        });
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  componentDidMount() {
    this.props.onChange(this.state.selectedSize);
  }

  handleSizeChange(event) {
    var selectedSize = this.state.sizes[event.target.value];
    this.setState({selectedSize: selectedSize})
    this.props.onChange(selectedSize);
  }

  render() {
    return (
      <div id="size">
       <form>
        {this.state.sizes.map((size, idx) =>
          <label>
            <input type="radio" value={idx} checked={this.state.selectedSize === size.name} onChange={this.handleSizeChange}/>
            {size.name}
          </label>
        )}
       </form>
      </div>
    );
  }
}

export default Sizes;
