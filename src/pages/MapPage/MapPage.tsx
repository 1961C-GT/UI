import React from "react";
import { Query } from "react-apollo";
import { GoogleAPI, GoogleApiWrapper, Map, Marker } from "google-maps-react";

import { nodeDetailsQuery } from "pages/DetailsPage";

import MapStyles from "./MapStyles";
import { CustomMapType } from "./types";

type IProps = {
  google: GoogleAPI;
};

const MapPage: React.FC<IProps> = props => (
  // TODO: Optimize query
  // We don't need the full nodeDetailsQuery here, but doing a smaller
  // query runs into this problem:
  // https://github.com/apollographql/react-apollo/issues/2114
  // TODO: Move query inside map, so query errors don't make map disappear?
  <Query query={nodeDetailsQuery} partialRefetch>
    {({ loading, error, data }) => {
      return (
        <Map
          google={props.google}
          initialCenter={{ lat: 34.2162456, lng: -83.9558699 }}
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
            map!.setMapTypeId(CustomMapType.DARK);
          }}
          onMaptypeidChanged={(mapProps, map) => {
            console.log(`MapTypeId: ${map!.getMapTypeId()}`);
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
        </Map>
      );
    }}
  </Query>
);

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GAPI_KEY as string
})(MapPage);
