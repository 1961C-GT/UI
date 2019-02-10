import React, { Component } from "react";
import { GoogleAPI, GoogleApiWrapper } from "google-maps-react";

import MapStyles from "./MapStyles";
import { StyledMap } from "./styles";

class MapPage extends Component<{ google: GoogleAPI }> {
  render() {
    return (
      <StyledMap
        google={this.props.google}
        initialCenter={{ lat: 34.2151381, lng: -83.9542486 }}
        zoom={16}
        disableDefaultUI
        backgroundColor={"#001529"}
        mapTypeControl={true}
        mapTypeControlOptions={{
          mapTypeIds: Object.keys(MapStyles),
          position: google.maps.ControlPosition.RIGHT_BOTTOM
        }}
        onReady={(mapProps, map) => {
          Object.entries(MapStyles).forEach(([name, mapStyle]) =>
            map!.mapTypes.set(
              name,
              new google.maps.StyledMapType(mapStyle, { name })
            )
          );
          map!.setMapTypeId("Aubergine");
        }}
        onMaptypeidChanged={(mapProps, map) => {
          console.log(`MapTypeId: ${map!.getMapTypeId()}`);
        }}
      />
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GAPI_KEY as string
})(MapPage);
