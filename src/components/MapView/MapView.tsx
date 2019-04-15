import React from "react";
import { Query } from "react-apollo";
import { GoogleApiWrapper, Map, Marker } from "google-maps-react";

import Themes from "App/themes";
import { detailsViewQuery } from "components/DetailsView/queries";

import { themeQuery } from "./queries";
import { IProps } from "./types";

let mapView: google.maps.Map;

const MapView: React.FC<IProps> = props => (
  <Query query={themeQuery}>
    {({ loading, data: settingsData }) =>
      loading ? null : (
        <Query
          query={detailsViewQuery /* TODO: implement mapViewQuery */}
          pollInterval={500}
        >
          {({ loading, error, data: nodesData }) => {
            mapView &&
              mapView.setMapTypeId(
                settingsData.theme == "Satellite"
                  ? "satellite"
                  : settingsData.theme
              );
            return (
              <Map
                google={props.google}
                initialCenter={{ lat: 34.2169, lng: -83.9513 }}
                zoom={17}
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
                        icon={
                          node.type == "BASE"
                            ? {
                                path: google.maps.SymbolPath.CIRCLE,
                                scale: 7,
                                fillColor: "green",
                                fillOpacity: 0.75,
                                strokeWeight: 1
                              }
                            : {
                                path:
                                  google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                                scale: 6,
                                fillColor: "red",
                                fillOpacity: 0.75,
                                strokeWeight: 1,
                                rotation: node.pose.orientation.heading
                              }
                        }
                        label={
                          node.type == "BASE" ? node.name.split(" ")[1] : ""
                        }
                        title={node.name}
                        draggable={node.type == "BASE"}
                        onDragend={(p, m, e) =>
                          console.log(e.latLng.lat(), e.latLng.lng())
                        }
                        onClick={() => console.log("Clicked", node)}
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
