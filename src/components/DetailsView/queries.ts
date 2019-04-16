import gql from "graphql-tag";

export const settingsQuery = gql`
  {
    devMode @client
    expandedDetails @client
  }
`;

export const nodesQuery = gql`
  query {
    nodes {
      id
      type
      name
      pose {
        position {
          lat
          lon
          accuracy
        }
        orientation {
          heading
          source
        }
      }
      telemetry {
        groundSpeed
        temp
        batt
      }
    }
  }
`;
