import gql from "graphql-tag";

export const settingsQuery = gql`
  {
    theme @client
    devMode @client
  }
`;

export const mapViewQuery = gql`
  query {
    nodes {
      id
      type
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
    }
  }
`;
