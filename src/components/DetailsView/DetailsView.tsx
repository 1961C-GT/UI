import * as React from "react";
import { Query } from "react-apollo";
import { Alert, Collapse, Skeleton } from "antd";

import { BatteryIcon } from "components/BatteryIcon";
import { detailsViewQuery } from "./queries";
import { PanelHeader, StyledCollapse } from "./styles";

const DetailsView: React.FC = () => (
  <Query query={detailsViewQuery} pollInterval={500} partialRefetch>
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
                  {node.name}
                  <BatteryIcon
                    percentage={node.telemetry.batt}
                    showPercentage={data.settings.devMode}
                  />
                </PanelHeader>
              }
              key={node.id}
            >
              {data.settings.devMode && (
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
                  {data.settings.devMode && (
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
