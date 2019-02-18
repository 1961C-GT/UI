import gql from "graphql-tag";

export const settingsQuery = gql`
  {
    settings @client {
      theme
    }
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
