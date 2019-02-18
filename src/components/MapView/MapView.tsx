import React from "react";
import { Query } from "react-apollo";
import { GoogleApiWrapper, Map, Marker } from "google-maps-react";

import Themes from "App/themes";
import { detailsViewQuery } from "components/DetailsView/queries";

import { settingsQuery } from "./queries";
import { IProps } from "./types";

const MapPage: React.FC<IProps> = props => (
  <Query query={settingsQuery}>
    {({ loading, data }) =>
      loading ? null : (
        <Map
          google={props.google}
          initialCenter={{ lat: 34.2162456, lng: -83.9558699 }}
          zoom={16}
          disableDefaultUI
          backgroundColor={"transparent"}
          onReady={(mapProps, map) => {
            map!.mapTypes.set(
              data.settings.theme,
              new props.google.maps.StyledMapType(
                Themes[data.settings.theme].mapStyles,
                { name: data.settings.theme }
              )
            );
            map!.setMapTypeId(data.settings.theme);
          }}
        >
          <Query query={detailsViewQuery /* TODO: implement mapViewQuery */}>
            {({ loading, error, data }) =>
              loading || error
                ? null
                : data.nodes.map((node: any) => (
                    <Marker
                      key={node.id}
                      position={{
                        lat: node.pose.position.lat,
                        lng: node.pose.position.lon
                      }}
                    />
                  ))
            }
          </Query>
        </Map>
      )
    }
  </Query>
);

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GAPI_KEY as string
})(MapPage);
