import gql from "graphql-tag";

// export const settingsQuery = gql`
//   {
//   }
// `;

export const mapViewQuery = gql`
  query {
    theme @client
    devMode @client
    expandedDetails @client
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
