import gql from "graphql-tag";

export const themeQuery = gql`
  {
    theme @client
  }
`;
