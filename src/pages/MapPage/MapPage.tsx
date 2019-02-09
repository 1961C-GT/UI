import React, { Component } from "react";
import { GoogleAPI, GoogleApiWrapper, Map } from "google-maps-react";

import { MapStylesAubergine as mapStyles } from "./MapStyles";

class MapPage extends Component<{ google: GoogleAPI }> {
  render() {
    return (
      <Map
        google={this.props.google}
        initialCenter={{ lat: 34.2151381, lng: -83.9542486 }}
        zoom={16}
        disableDefaultUI
        disableDoubleClickZoom
        draggable={false}
        styles={mapStyles}
        mapTypeId={google.maps.MapTypeId.HYBRID}
      />
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBjzrb6IzOL8FljltCWyZrjluxIaAxveK0"
})(MapPage);
