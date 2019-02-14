import * as React from "react";

import MapPage from "pages/MapPage/MapPage";
import DetailsPage from "pages/DetailsPage/DetailsPage";

import { AppContainer, ContentHeader, ContentPane, Logo } from "./styles";
import { Icon } from "antd";

export const App: React.FC = () => (
  <AppContainer>
    <Logo />
    <MapPage />
    <ContentPane>
      <ContentHeader>
        <div>Details</div>
        <Icon type="setting" />
      </ContentHeader>
      <DetailsPage />
    </ContentPane>
  </AppContainer>
);

export default App;
