import gql from "graphql-tag";

export const settingsQuery = gql`
  {
    theme @client
    devMode @client
    expandedDetails @client
  }
`;

export const mapViewQuery = gql`
  query {
    nodes {
      id
      name
      type
      pose {
        position {
          lat
          lon
          accuracy
        }
        orientation {
          heading
        }
      }
    }
  }
`;
