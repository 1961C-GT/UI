import gql from "graphql-tag";

export const settingsQuery = gql`
  {
    settings @client {
      theme
    }
  }
`;
