import * as React from "react";

import MapPage, { MapStyles, CustomMapType } from "pages/MapPage";
import DetailsPage from "pages/DetailsPage";

import { Icon, Select, Switch } from "antd";
import {
  AppContainer,
  ContentHeader,
  ContentPane,
  Logo,
  MapPane,
  ResponsiveDrawer,
  SettingsDescription,
  SettingsItem,
  SettingsLabel
} from "./styles";

type Props = {};

type State = {
  settingsOpen: boolean;
};

export class App extends React.Component<Props, State> {
  readonly state: State = {
    settingsOpen: false
  };

  handleSettingsOpen = () => {
    this.setState({ settingsOpen: true });
  };

  handleSettingsClose = () => {
    this.setState({ settingsOpen: false });
  };

  render() {
    return (
      <AppContainer>
        <Logo />
        <MapPane>
          <MapPage />
        </MapPane>
        <ContentPane>
          <ContentHeader>
            <div>Details</div>
            <Icon type="setting" onClick={this.handleSettingsOpen} />
          </ContentHeader>
          <DetailsPage />
        </ContentPane>
        <ResponsiveDrawer
          title="Settings"
          onClose={this.handleSettingsClose}
          visible={this.state.settingsOpen}
        >
          <SettingsItem>
            <div>
              <SettingsLabel>Theme</SettingsLabel>
              <SettingsDescription>
                Changes the look of the app.
              </SettingsDescription>
            </div>
            <Select defaultValue={CustomMapType.DARK} style={{ width: "96px" }}>
              {Object.keys(MapStyles).map(style => (
                <Select.Option key={style} value={style}>
                  {style}
                </Select.Option>
              ))}
            </Select>
          </SettingsItem>
          <SettingsItem>
            <div>
              <SettingsLabel>Show all nodes</SettingsLabel>
              <SettingsDescription>
                Displays base/fixed nodes on the map.
              </SettingsDescription>
            </div>
            <Switch defaultChecked />
          </SettingsItem>
          {[1, 2, 3].map(num => (
            <SettingsItem key={num}>
              <div>
                <SettingsLabel>Example setting {num}</SettingsLabel>
                <SettingsDescription>
                  Makes number {num}, along with its friends, appear on the map.
                </SettingsDescription>
              </div>
              <Switch defaultChecked />
            </SettingsItem>
          ))}
        </ResponsiveDrawer>
      </AppContainer>
    );
  }
}

export default App;
