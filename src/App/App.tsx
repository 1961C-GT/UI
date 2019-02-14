import React, { Component } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

import { Logo, ContentPane, AppContainer } from "./styles";
import MapPage from "../pages/MapPage/MapPage";
import DetailsPage from "../pages/DetailsPage/DetailsPage";

class App extends Component<RouteComponentProps> {
  render() {
    return (
      <AppContainer>
        <Logo />
        <MapPage />
        <ContentPane>
          <DetailsPage />
        </ContentPane>
      </AppContainer>
    );
  }
}

export default withRouter(App);
