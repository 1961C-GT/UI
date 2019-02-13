import React from "react";
import { connect } from "react-redux";
import { GoogleAPI, GoogleApiWrapper, Marker } from "google-maps-react";

import MapStyles from "./MapStyles";
import { StyledMap } from "./styles";

import { IState, MapType } from "App/types";
import { CustomMapType } from "./types";

import { setMapType } from "App/actions";

import { Query } from "react-apollo";
import gql from "graphql-tag";

type Props = {
  google: GoogleAPI;
  mapType: MapType;
  dispatch: any; // TODO: Figure out proper type for this
};

// TODO: Implement bindActionCreators
// onSetMapType: (mapTypeId: string | google.maps.MapTypeId) => any;

const MapPage: React.FC<Props> = props => (
  <Query
    query={gql`
      query {
        nodes {
          id
          pose {
            position {
              lat
              lon
            }
          }
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading || error) return null;
      return (
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
        >
          {data.nodes.map((node: any) => (
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
