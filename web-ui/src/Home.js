import React, { Component } from 'react';
import Map from "./Map.js"

class Home extends Component {

    // Now export the above Map component into another component by passing the props values
    render() {
      return(
          <Map
       google={this.props.google}
	   center={{lat: 42.340080, lng: -71.088890}}
       height='300px'
       zoom={15}
      />
        )
    }
}

export default Home;