import * as React from "react";
import { Query } from "react-apollo";
import { Alert, Collapse, Skeleton } from "antd";

import { BatteryIcon } from "components/BatteryIcon";
import { detailsViewQuery } from "./queries";
import { PanelHeader, StyledCollapse } from "./styles";

const DetailsView: React.FC = () => (
  <Query query={detailsViewQuery} partialRefetch>
    {({ loading, error, data, client }) => {
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
        <StyledCollapse
          bordered={false}
          activeKey={data.expandedDetails}
          onChange={expandedDetails =>
            client.writeData({
              data: { expandedDetails }
            })
          }
        >
          {data.nodes.map((node: any) => (
            <Collapse.Panel
              header={
                <PanelHeader>
                  {node.name}
                  <BatteryIcon
                    percentage={node.telemetry.batt}
                    showPercentage={data.devMode}
                  />
                </PanelHeader>
              }
              key={node.id}
            >
              {data.devMode && (
                <div>
                  <p>
                    {node.pose.position.lat}, {node.pose.position.lon}
                  </p>
                  <p>Temp: {node.telemetry.temp}ºC</p>
                </div>
              )}
              {node.type === "MOBILE" && (
                <div>
                  <p>
                    {Number(node.pose.orientation.heading).toFixed(2)}º @{" "}
                    {Number(node.telemetry.groundSpeed).toFixed(2)} knots
                  </p>
                  {data.devMode && (
                    <p>Orientation source: {node.pose.orientation.source}</p>
                  )}
                </div>
              )}
            </Collapse.Panel>
          ))}
        </StyledCollapse>
      );
    }}
  </Query>
);

export default DetailsView;
