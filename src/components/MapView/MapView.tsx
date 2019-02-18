import React from "react";
import { Query } from "react-apollo";
import { GoogleApiWrapper, Map, Marker } from "google-maps-react";

import Themes from "App/themes";
import { detailsViewQuery } from "components/DetailsView/queries";

import { settingsQuery } from "./queries";
import { IProps } from "./types";

let mapView: google.maps.Map;

const MapView: React.FC<IProps> = props => (
  <Query query={settingsQuery}>
    {({ loading, data: settingsData }) =>
      loading ? null : (
        <Query query={detailsViewQuery /* TODO: implement mapViewQuery */}>
          {({ loading, error, data: nodesData }) => {
            mapView && mapView.setMapTypeId(settingsData.settings.theme);
            return (
              <Map
                google={props.google}
                initialCenter={{ lat: 34.2162456, lng: -83.9558699 }}
                zoom={16}
                disableDefaultUI
                backgroundColor={"transparent"}
                onReady={(mapProps, map) => {
                  Object.entries(Themes).forEach(([name, { mapStyles }]) =>
                    map!.mapTypes.set(
                      name,
                      new props.google.maps.StyledMapType(mapStyles, {
                        name
                      })
                    )
                  );
                  mapView = map!;
                }}
              >
                {loading || error
                  ? null
                  : nodesData.nodes.map((node: any) => (
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
      )
    }
  </Query>
);

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GAPI_KEY as string
})(MapView);
