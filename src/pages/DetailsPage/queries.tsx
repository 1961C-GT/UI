import gql from "graphql-tag";

export const nodeDetailsQuery = gql`
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
`;
