import React from 'react';

class Omega extends React.Component {
  constructor(props) {
    super(props);

    this.getAllTopings = this.getAllTopings.bind(this);
  }

  getAllTopings() {
    $.ajax({
      url: '/topings',
      method: 'POST',
      success: function(data) {
        console.log(data);
      }
    });
  }


  render() {
    return (
      <h1>Hello</h1>
    );
  }
}

export default Omega;
