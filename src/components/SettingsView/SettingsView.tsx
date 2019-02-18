import * as React from "react";
import { Query } from "react-apollo";
import { Select, Switch } from "antd";

import Themes from "App/themes";
import { ThemeType } from "App/types";

import { settingsQuery } from "./queries";
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
      <Query query={settingsQuery}>
        {({ loading, data, client }) =>
          loading ? null : (
            <Select
              defaultValue={data.settings.theme}
              style={{ width: "128px" }}
              onSelect={theme =>
                client.writeData({
                  data: { settings: { __typename: "Settings", theme } }
                })
              }
            >
              {Object.keys(Themes).map(theme => (
                <Select.Option key={theme} value={theme}>
                  {theme}
                </Select.Option>
              ))}
            </Select>
          )
        }
      </Query>
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
