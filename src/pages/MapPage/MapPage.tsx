import React, { Component } from "react";
import { GoogleAPI, GoogleApiWrapper } from "google-maps-react";

import { MapStylesAubergine as mapStyles } from "./MapStyles";
import { StyledMap } from "./styles";

class MapPage extends Component<{ google: GoogleAPI }> {
  render() {
    return (
      <StyledMap
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
