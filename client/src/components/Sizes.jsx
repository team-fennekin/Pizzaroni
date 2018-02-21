import React, { Component } from 'react';
import $ from 'jquery';

class Sizes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sizes: [],
      selectedSize: {}
    };

    this.handleSizeChange = this.handleSizeChange.bind(this);

    this.props.socket.on('updateSize', function(size) {
      setNewSize(size);
    });

    const setNewSize = size => {
      // console.log('JUST SET IT TO THIS: ', size);
      // this.setState({size: size});
      this.setState({selectedSize: size}, function() {
        this.props.onSizeChange(this.state.selectedSize);
      });
    };
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
    let selectedSize = this.state.sizes[event.target.value];
    this.setState({selectedSize: selectedSize}, function() {
      if (this.props.roomID !== 'lobby') {
        this.props.socket.emit('initiateSizeChange', this.state.selectedSize);
      }
      this.props.onSizeChange(this.state.selectedSize);
    });
  }

  render() {
    return (
      <div id={(this.props.currentStep === 0) ? 'show' : 'hide'}>
       <form>
         <ol>
           {this.state.sizes.map((size, idx) =>
             <li key={size.id}>
               <label key={size.id}>
                 <input type="radio" value={idx} key={size.id} checked={this.state.selectedSize.name === size.name} onChange={this.handleSizeChange}/>
                 {size.name}
               </label>
             </li>
           )}
         </ol>
       </form>
      </div>
    );
  }
}

export default Sizes;
