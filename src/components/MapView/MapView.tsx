import React from "react";
import { Query } from "react-apollo";
import { GoogleApiWrapper, Map, Marker } from "google-maps-react";

import Themes from "App/themes";
import { detailsViewQuery } from "components/DetailsView/queries";

import { settingsQuery } from "./queries";
import { IProps } from "./types";

const MapView: React.FC<IProps> = props => (
  <Query query={settingsQuery}>
    {({ loading, data: settingsData }) =>
      loading ? null : (
        <Query query={detailsViewQuery /* TODO: implement mapViewQuery */}>
          {({ loading, error, data: nodesData }) => (
            <Map
              google={props.google}
              initialCenter={{ lat: 34.2162456, lng: -83.9558699 }}
              zoom={16}
              disableDefaultUI
              backgroundColor={"transparent"}
              onReady={(mapProps, map) => {
                map!.mapTypes.set(
                  settingsData.settings.theme,
                  new props.google.maps.StyledMapType(
                    Themes[settingsData.settings.theme].mapStyles,
                    { name: settingsData.settings.theme }
                  )
                );
                map!.setMapTypeId(settingsData.settings.theme);
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
          )}
        </Query>
      )
    }
  </Query>
);

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GAPI_KEY as string
})(MapView);
