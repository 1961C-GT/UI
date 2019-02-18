import React from "react";
import ReactDOM from "react-dom";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import gql from "graphql-tag";

import { ThemeProvider } from "styled-components";

import "./index.css";
import apolloConfig from "./apolloConfig";
import App from "./App";
import Themes from "./App/themes";

import * as serviceWorker from "./serviceWorker";
import Query from "react-apollo/Query";

const client = new ApolloClient(apolloConfig);

const themeQuery = gql`
  {
    settings @client {
      theme
    }
  }
`;

const MOUNT_NODE = document.getElementById("root") as Element;

const render = () => {
  ReactDOM.render(
    <ApolloProvider client={client}>
      <Query query={themeQuery}>
        {({ loading, data }) =>
          loading ? null : (
            <ThemeProvider theme={Themes[data.settings.theme].appStyles}>
              <App />
            </ThemeProvider>
          )
        }
      </Query>
    </ApolloProvider>,
    MOUNT_NODE
  );
};

if ((module as any).hot) {
  (module as any).hot.accept("./App", () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render();
  });
}

render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
