import React from 'react';
import $ from 'jquery';

class Crusts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      crusts: [],
      selectedCrust: {}
    };

    this.handleCrustChange = this.handleCrustChange.bind(this);

    this.props.socket.on('updateCrust', function(crust) {
      setNewCrust(crust);
    });

    const setNewCrust = crust => {
      // console.log('JUST FUCKING SET IT TO THIS: ', size);
      // this.setState({size: size});
      this.setState({selectedCrust: crust}, function() {
        this.props.onCrustChange(this.state.selectedCrust);
      });
    };

  }

  // componentWillMount() {
  //   $.ajax({
  //     url: '/crusts',
  //     method: 'GET',
  //     success: (data) => {
  //       this.setState({
  //         crusts: data,
  //         selectedCrust: data[0]
  //       }, function(){
  //         this.props.onCrustChange(this.state.selectedCrust);
  //       });
  //     },
  //     error: (error) => {
  //       console.log(error);
  //     }
  //   });
  // }

  handleCrustChange(event) {
    var selectedCrust = this.state.crusts[event.target.value];
    this.setState({selectedCrust: selectedCrust}, function() {
      if (this.props.roomID !== 'lobby') {
        this.props.socket.emit('initializeCrustChange', this.state.selectedCrust);
      }
      this.props.onCrustChange(this.state.selectedCrust);
    });
  }

  render() {
    return (
      <div id={(this.props.currentStep === 1) ? 'show' : 'hide'}>
        <form>
          <ol>
            {this.state.crusts.map((crust, idx) =>
              <li key={crust.id}>
                <label key={crust.id}>
                  <input type="radio" value={idx} key={crust.id} checked={this.state.selectedCrust.name === crust.name} onChange={this.handleCrustChange}/>
                  {crust.name}
                </label>
              </li>
            )}
          </ol>
       </form>
      </div>
    );
  }
}

export default Crusts;
