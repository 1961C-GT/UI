import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "redux";
import ApolloClient from "apollo-boost";

import { Provider as ReduxProvider } from "react-redux";
import { ApolloProvider } from "react-apollo";
import { ThemeProvider } from "styled-components";

import "./index.css";
import App from "./App";
import appReducer from "./App/reducer";

import * as serviceWorker from "./serviceWorker";

const client = new ApolloClient({
  uri: "http://localhost:4000"
});

const store = createStore(
  appReducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

const theme = {
  background: "#000000"
};

const MOUNT_NODE = document.getElementById("root") as Element;

const render = () => {
  ReactDOM.render(
    <ApolloProvider client={client}>
      <ReduxProvider store={store}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </BrowserRouter>
      </ReduxProvider>
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
