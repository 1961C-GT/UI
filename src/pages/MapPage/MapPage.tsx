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
        styles={mapStyles}
        backgroundColor={"#001529"}
        mapTypeId={google.maps.MapTypeId.ROADMAP}
        mapTypeControl={true}
        mapTypeControlOptions={{
          mapTypeIds: [
            google.maps.MapTypeId.ROADMAP,
            google.maps.MapTypeId.HYBRID
          ],
          position: google.maps.ControlPosition.RIGHT_BOTTOM
        }}
      />
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GAPI_KEY as string
})(MapPage);
