import React from "react";
import ReactDOM from "react-dom";

import ApolloClient from "apollo-boost";
import { ApolloProvider, Query } from "react-apollo";

import { ThemeProvider } from "styled-components";

import "./index.css";
import apolloConfig, { defaults } from "./apolloConfig";
import App from "./App/index";
import Themes from "./App/themes";
import { themeQuery } from "App/queries";

import * as serviceWorker from "./serviceWorker";

/**
 * partialRefetch should always be true, but it defaults to false for reasons
 * that are totally unimaginable to me. this hacks it on for us.
 *
 * note: today, Query has no defaultProps but this Object.assign ensures it works either way
 * and will explicitly override any current or future value for `partialRefetch`.
 */
(Query as any).defaultProps = Object.assign({}, (Query as any).defaultProps, {
  partialRefetch: true
});

if (!(Query as any).defaultProps.partialRefetch) {
  console.error(
    "Unable to set partialRefetch = true for Apollo Query component."
  );
}

const client = new ApolloClient(apolloConfig);
client.writeData({ data: defaults });

const MOUNT_NODE = document.getElementById("root") as Element;

const render = () => {
  ReactDOM.render(
    <ApolloProvider client={client}>
      <Query query={themeQuery}>
        {({ loading, data }) =>
          loading ? null : (
            <ThemeProvider theme={Themes[data.theme].appStyles}>
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
