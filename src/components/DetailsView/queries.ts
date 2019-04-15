import gql from "graphql-tag";

export const detailsViewQuery = gql`
  query {
    settings @client {
      devMode
    }
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
        temp
        batt
      }
    }
  }
`;
