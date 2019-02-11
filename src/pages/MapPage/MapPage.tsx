import React from "react";
import { connect } from "react-redux";
import { GoogleAPI, GoogleApiWrapper } from "google-maps-react";

import MapStyles from "./MapStyles";
import { StyledMap } from "./styles";

import { IState, MapType } from "App/types";
import { CustomMapType } from "./types";

import { setMapType } from "App/actions";

type Props = {
  google: GoogleAPI;
  mapType: MapType;
  dispatch: any; // TODO: Figure out proper type for this
};

// TODO: Implement bindActionCreators
// onSetMapType: (mapTypeId: string | google.maps.MapTypeId) => any;

const MapPage: React.FC<Props> = props => (
  <StyledMap
    google={props.google}
    initialCenter={{ lat: 34.2151381, lng: -83.9542486 }}
    zoom={16}
    disableDefaultUI
    backgroundColor={"#001529"}
    mapTypeControl={true}
    mapTypeControlOptions={{
      mapTypeIds: Object.keys(MapStyles),
      position: props.google.maps.ControlPosition.RIGHT_BOTTOM
    }}
    onReady={(mapProps, map) => {
      Object.entries(MapStyles).forEach(([name, mapStyle]) =>
        map!.mapTypes.set(
          name,
          new props.google.maps.StyledMapType(mapStyle, { name })
        )
      );
      map!.setMapTypeId(props.mapType);
    }}
    onMaptypeidChanged={(mapProps, map) => {
      console.log(`MapTypeId: ${map!.getMapTypeId()}`);
      props.dispatch(setMapType(map!.getMapTypeId() as CustomMapType));
    }}
  />
);

const mapStateToProps = (state: IState) => ({
  mapType: state.theme.mapType
});

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GAPI_KEY as string
})(connect(mapStateToProps)(MapPage));
