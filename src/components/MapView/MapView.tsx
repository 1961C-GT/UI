import React from "react";
import { Query } from "react-apollo";
import { Circle, GoogleApiWrapper, Map, Marker } from "google-maps-react";

import Themes from "App/themes";

import { mapViewQuery, settingsQuery } from "./queries";
import { IProps } from "./types";

let mapView: google.maps.Map;

const MapView: React.FC<IProps> = props => (
  <Query query={settingsQuery}>
    {({ loading, data: settingsData, client }) =>
      loading ? null : (
        <Query query={mapViewQuery} pollInterval={500}>
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
                zoomControl
                rotateControl
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
                  : nodesData.nodes.map(
                      (node: any) =>
                        node.type == "MOBILE" && (
                          <Circle
                            key={`${node.id}-circle`}
                            center={{
                              lat: node.pose.position.lat,
                              lng: node.pose.position.lon
                            }}
                            radius={
                              node.pose.position.accuracy == -1
                                ? 25
                                : node.pose.position.accuracy / 1000
                            }
                            strokeColor={
                              node.pose.position.accuracy == -1
                                ? "darkred"
                                : "darkblue"
                            }
                            strokeWeight={0.5}
                            fillColor={
                              node.pose.position.accuracy == -1 ? "red" : "blue"
                            }
                          />
                        )
                    )}
                {loading || error
                  ? null
                  : nodesData.nodes.map(
                      (node: any) =>
                        (settingsData.devMode || node.type == "MOBILE") && (
                          <Marker
                            key={`${node.id}-marker`}
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
                                    fillOpacity: 0.5,
                                    strokeColor: "darkgreen",
                                    strokeWeight: 1
                                  }
                                : {
                                    path:
                                      google.maps.SymbolPath
                                        .FORWARD_CLOSED_ARROW,
                                    scale: 6,
                                    fillColor: "red",
                                    fillOpacity: 0.5,
                                    strokeColor: "darkred",
                                    strokeWeight: 1,
                                    anchor: new google.maps.Point(0, 2.5),
                                    labelOrigin: new google.maps.Point(0, 2.5),
                                    rotation:
                                      node.pose.orientation.heading -
                                      (mapView && mapView.getHeading())
                                  }
                            }
                            label={node.name.split(" ")[1]}
                            title={node.name}
                            draggable={node.type == "BASE"}
                            onDragend={(p, m, e) =>
                              console.log(
                                "Dragged",
                                node,
                                "to",
                                e.latLng.lat(),
                                e.latLng.lng()
                              )
                            }
                            onClick={() => {
                              const idx = settingsData.expandedDetails.findIndex(
                                (i: string) => i === node.id
                              );
                              const expandedDetails =
                                settingsData.expandedDetails;
                              if (idx == -1) expandedDetails.push(node.id);
                              else expandedDetails.splice(idx, 1);
                              client.writeData({
                                data: { expandedDetails }
                              });
                            }}
                          />
                        )
                    )}
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
