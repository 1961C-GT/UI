import React from "react";
import { connect } from "react-redux";
import { GoogleAPI, GoogleApiWrapper, Marker } from "google-maps-react";

import MapStyles from "./MapStyles";
import { StyledMap } from "./styles";

import { IState, MapType } from "App/types";
import { CustomMapType } from "./types";

import { setMapType } from "App/actions";

import { Query } from "react-apollo";
import { nodeDetailsQuery } from "../DetailsPage/queries";

type IProps = {
  google: GoogleAPI;
  mapType: MapType;
  dispatch: any; // TODO: Figure out proper type for this
};

// TODO: Implement bindActionCreators
// onSetMapType: (mapTypeId: string | google.maps.MapTypeId) => any;

const MapPage: React.FC<IProps> = props => (
  // TODO: Optimize query
  // We don't need the full nodeDetailsQuery here, but doing a smaller
  // query runs into this problem:
  // https://github.com/apollographql/react-apollo/issues/2114
  // TODO: Move query inside map, so query errors don't make map disappear?
  <Query query={nodeDetailsQuery} partialRefetch>
    {({ loading, error, data }) => {
      return (
        <StyledMap
          google={props.google}
          initialCenter={{ lat: 34.2112456, lng: -83.9658699 }}
          zoom={16}
          disableDefaultUI
          backgroundColor={"transparent"}
          mapTypeControl={false}
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
        >
          {loading || error
            ? null
            : data.nodes.map((node: any) => (
                <Marker
                  key={node.id}
                  position={{
                    lat: node.pose.position.lat,
                    lng: node.pose.position.lon
                  }}
                />
              ))}
        </StyledMap>
      );
    }}
  </Query>
);

const mapStateToProps = (state: IState) => ({
  mapType: state.theme.mapType
});

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GAPI_KEY as string
})(connect(mapStateToProps)(MapPage));
