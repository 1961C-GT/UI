import React, { Component } from "react";

import { Query } from "react-apollo";
import { nodeDetailsQuery } from "./queries";

import { Alert, Collapse, Skeleton } from "antd";
import { PanelHeader, StyledCollapse } from "./styles";

class DetailsPage extends Component {
  render() {
    return (
      <Query query={nodeDetailsQuery} partialRefetch>
        {({ loading, error, data }) => {
          if (loading) return <Skeleton active />;
          if (error)
            return (
              <Alert
                message="Error"
                description="Could not fetch node details."
                type="error"
                showIcon
              />
            );
          return (
            <StyledCollapse bordered={false}>
              {data.nodes.map((node: any) => (
                <Collapse.Panel
                  header={
                    <PanelHeader>
                      <div>{node.name}</div>
                      <div>{node.type}</div>
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
            </StyledCollapse>
          );
        }}
      </Query>
    );
  }
}

export default DetailsPage;
