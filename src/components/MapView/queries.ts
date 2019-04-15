import gql from "graphql-tag";

export const themeQuery = gql`
  {
    theme @client
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
