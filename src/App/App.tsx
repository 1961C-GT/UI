import * as React from "react";
import { Icon } from "antd";

import DetailsView from "components/DetailsView/index";
import MapView from "components/MapView/index";
import SettingsView from "components/SettingsView/SettingsView";

import {
  AppContainer,
  ContentHeader,
  ContentPane,
  Logo,
  MapPane
} from "./styles";
import { IProps, IState } from "./types";

class App extends React.Component<IProps, IState> {
  readonly state: IState = {
    settingsOpen: false
  };

  handleSettingsOpen = () => this.setState({ settingsOpen: true });
  handleSettingsClose = () => this.setState({ settingsOpen: false });

  render() {
    return (
      <AppContainer>
        <Logo />
        <MapPane>
          <MapView />
        </MapPane>
        <ContentPane>
          <ContentHeader>
            <div>Details</div>
            <Icon type="setting" onClick={this.handleSettingsOpen} />
          </ContentHeader>
          <DetailsView />
        </ContentPane>
        <SettingsView
          settingsOpen={this.state.settingsOpen}
          onSettingsClose={this.handleSettingsClose}
        />
      </AppContainer>
    );
  }
}

export default App;
