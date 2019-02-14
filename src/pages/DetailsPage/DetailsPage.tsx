import React, { Component } from "react";

import { Query } from "react-apollo";
import { nodeDetailsQuery } from "./queries";

import { Collapse, Skeleton } from "antd";
import { PanelHeader, HeaderName, HeaderType, StyledCollapse } from "./styles";

class DetailsPage extends Component {
  render() {
    return (
      <Query query={nodeDetailsQuery} partialRefetch>
        {({ loading, error, data }) => {
          if (loading) return <Skeleton active />;
          if (error) return <p>Error :(</p>;
          console.log(loading);
          console.log(error);
          console.log(data);
          return (
            <StyledCollapse bordered={false}>
              {data.nodes &&
                data.nodes.map((node: any) => (
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
            </StyledCollapse>
          );
        }}
      </Query>
    );
  }
}

export default DetailsPage;
