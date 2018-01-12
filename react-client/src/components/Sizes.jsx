import React from 'react';
import $ from 'jquery';

class Sizes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sizes: [],
      selectedSize: {}
    };

    this.handleSizeChange = this.handleSizeChange.bind(this);
  }

  componentWillMount() {
    $.ajax({
      url: '/sizes',
      method: 'GET',
      success: (data) => {
        this.setState({
          sizes: data,
          selectedSize: data[2]
        }, function(){
          this.props.onSizeChange(this.state.selectedSize);
        });
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  handleSizeChange(event) {
    var selectedSize = this.state.sizes[event.target.value];
    this.setState({selectedSize: selectedSize})
    this.props.onSizeChange(selectedSize);
  }

  render() {
    return (
      <div id="size">
       <form>
        {this.state.sizes.map((size, idx) =>
          <label>
            <input type="radio" value={idx} checked={this.state.selectedSize.name === size.name} onChange={this.handleSizeChange}/>
            {size.name}
          </label>
        )}
       </form>
      </div>
    );
  }
}

export default Sizes;
