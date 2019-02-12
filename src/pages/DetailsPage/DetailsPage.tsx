import React, { Component } from "react";

import { Query } from "react-apollo";
import gql from "graphql-tag";

import { Collapse } from "antd";

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
            <Collapse accordion>
              {data.nodes.map((node: any) => (
                <Collapse.Panel header={node.name} key={node.id}>
                  <p>Type: {node.type}</p>
                  <p>
                    Location: ({node.pose.position.lat},{" "}
                    {node.pose.position.lon})
                  </p>
                  <p>
                    Orientation: {node.pose.orientation.heading} (source:{" "}
                    {node.pose.orientation.source})
                  </p>
                  <p>Speed: {node.telemetry.groundSpeed} knots?</p>
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
