import * as React from "react";
import { Select, Switch } from "antd";

import Themes from "App/themes";
import { ThemeType } from "App/types";

import {
  ResponsiveDrawer,
  SettingsDescription,
  SettingsItem,
  SettingsLabel
} from "./styles";
import { IProps } from "./types";

const SettingsView: React.FC<IProps> = props => (
  <ResponsiveDrawer
    title="Settings"
    onClose={props.onSettingsClose}
    visible={props.settingsOpen}
  >
    <SettingsItem>
      <div>
        <SettingsLabel>Theme</SettingsLabel>
        <SettingsDescription>Changes the look of the app.</SettingsDescription>
      </div>
      <Select defaultValue={ThemeType.DARK} style={{ width: "128px" }}>
        {Object.keys(Themes).map(theme => (
          <Select.Option key={theme} value={theme}>
            {theme}
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
  </ResponsiveDrawer>
);

export default SettingsView;
