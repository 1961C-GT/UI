import * as React from "react";
import { Query } from "react-apollo";
import { Alert, Collapse, Skeleton } from "antd";

import { BatteryIcon } from "components/BatteryIcon";
import { nodesQuery, settingsQuery } from "./queries";
import { PanelHeader, StyledCollapse } from "./styles";

const DetailsView: React.FC = () => (
  <Query query={nodesQuery} pollInterval={500}>
    {({ loading, error, data, client }) => {
      if (loading) return <Skeleton active />;
      if (error)
        return (
          <Alert
            message="Could not fetch node details."
            description="Check your network connectivity."
            type="error"
            showIcon
          />
        );
      if (!data.nodes || data.nodes.length === 0)
        return (
          <Alert
            message="No nodes found."
            description="Is the base code running?"
            type="info"
            showIcon
          />
        );
      return (
        <Query query={settingsQuery}>
          {({ loading: sLoading, error: sError, data: sData }) => {
            if (sLoading) return <Skeleton active />;
            if (sError)
              return (
                <Alert
                  message="Fatal error!"
                  description="Could not load settings!"
                  type="error"
                  showIcon
                />
              );
            return (
              <StyledCollapse
                bordered={false}
                activeKey={sData.expandedDetails}
                onChange={expandedDetails =>
                  client.writeData({
                    data: { expandedDetails }
                  })
                }
              >
                {data.nodes.map(
                  (node: any) =>
                    (sData.devMode || node.type == "MOBILE") && (
                      <Collapse.Panel
                        header={
                          <PanelHeader>
                            {node.name}
                            <BatteryIcon
                              percentage={node.telemetry.batt}
                              showPercentage={sData.devMode}
                            />
                          </PanelHeader>
                        }
                        key={node.id}
                      >
                        {sData.devMode && (
                          <div>
                            <p>
                              Location: {node.pose.position.lat},{" "}
                              {node.pose.position.lon} ±{" "}
                              {Math.round(node.pose.position.accuracy / 10) /
                                10}
                              m
                            </p>
                            <p>DW1000 temp: {node.telemetry.temp}ºC</p>
                          </div>
                        )}
                        {node.type === "MOBILE" && (
                          <div>
                            <p>
                              {Number(node.pose.orientation.heading).toFixed(2)}
                              º @{" "}
                              {Number(node.telemetry.groundSpeed).toFixed(2)}{" "}
                              knots
                            </p>
                            {sData.devMode && (
                              <p>
                                Orientation source:{" "}
                                {node.pose.orientation.source}
                              </p>
                            )}
                          </div>
                        )}
                      </Collapse.Panel>
                    )
                )}
              </StyledCollapse>
            );
          }}
        </Query>
      );
    }}
  </Query>
);

export default DetailsView;
