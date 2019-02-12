import React, { Component } from "react";

import { Query } from "react-apollo";
import gql from "graphql-tag";

import { Collapse } from "antd";
import { PanelHeader, HeaderName, HeaderType } from "./styles";

class DetailsPage extends Component {
  render() {
    return (
      <Query
        query={gql`
          query {
            nodes {
              id
              type
              name
              pose {
                position {
                  lat
                  lon
                }
                orientation {
                  heading
                  source
                }
              }
              telemetry {
                groundSpeed
              }
            }
          }
        `}
      >
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;
          return (
            <Collapse bordered={false}>
              {data.nodes.map((node: any) => (
                <Collapse.Panel
                  header={
                    <PanelHeader>
                      <HeaderName>{node.name}</HeaderName>
                      <HeaderType>{node.type}</HeaderType>
                    </PanelHeader>
                  }
                  key={node.id}
                >
                  <p>
                    Location: ({node.pose.position.lat},{" "}
                    {node.pose.position.lon})
                  </p>
                  {node.type === "MOBILE" && (
                    <div>
                      <p>
                        Orientation:{" "}
                        {Number(node.pose.orientation.heading).toFixed(2)}º
                        (source: {node.pose.orientation.source})
                      </p>
                      <p>
                        Speed: {Number(node.telemetry.groundSpeed).toFixed(2)}{" "}
                        knots
                      </p>
                    </div>
                  )}
                </Collapse.Panel>
              ))}
            </Collapse>
          );
        }}
      </Query>
    );
  }
}

export default DetailsPage;
