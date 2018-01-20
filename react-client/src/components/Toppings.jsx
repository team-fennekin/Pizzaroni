import React from 'react';
import $ from 'jquery';

class Toppings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      toppings: [],
      selectedToppings: {}
    };

    this.handleToppingChange = this.handleToppingChange.bind(this);

    // this.props.socket.on('updateToppings', function(toppings) {
    //   setNewToppings(toppings);
    // });

    // const setNewToppings = toppings => {
    //   this.setState({selectedToppings: toppings}, function() {
    //     this.props.onToppingChange(this.state.selectedToppings);
    //   });
    // };
  }

  componentWillMount() {
    $.ajax({
      url: '/toppings',
      method: 'GET',
      success: (data) => {
        // console.log('made it');
        this.setState({
          toppings: data
        });
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  handleToppingChange(event) {

    var idx = event.target.value;
    var prevToppingsState = this.state.selectedToppings;
    if (prevToppingsState.hasOwnProperty(idx)) {
      delete prevToppingsState[idx];
    } else {
      prevToppingsState[idx] = this.state.toppings[idx];
    }

    this.setState({
      selectedToppings: prevToppingsState
    }, function(){
      if (this.props.roomID !== 'lobby') {
        this.props.socket.emit('changeToppings', this.state.selectedToppings);
      }
      this.props.onToppingChange(this.state.selectedToppings);
    });
  }

  render() {
    return (
      <div id={(this.props.currentStep === 2) ? 'show' : 'hide'}>
        <ul id="navUl">
          {this.state.toppings.map((topping, idx) =>
            <li key={topping.id}>
              <label key={topping.id}>
                <input type="checkbox" value={idx} key={topping.id} checked={this.state.selectedToppings[idx] !== undefined} onChange={this.handleToppingChange}/>
                {topping.name}
              </label>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export default Toppings;
