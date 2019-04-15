import * as React from "react";
import { Query } from "react-apollo";
import { Select, Switch } from "antd";

import Themes from "App/themes";

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
    <Query query={settingsQuery}>
      {({ loading, data, client }) =>
        loading ? null : (
          <div>
            <SettingsItem>
              <div>
                <SettingsLabel>Theme</SettingsLabel>
                <SettingsDescription>
                  Changes the look of the app.
                </SettingsDescription>
              </div>
              <Select
                defaultValue={data.theme}
                style={{ width: "128px" }}
                onSelect={theme => client.writeData({ data: { theme } })}
              >
                {Object.keys(Themes).map(theme => (
                  <Select.Option key={theme} value={theme}>
                    {theme}
                  </Select.Option>
                ))}
              </Select>
            </SettingsItem>
            <SettingsItem>
              <div>
                <SettingsLabel>Developer mode</SettingsLabel>
                <SettingsDescription>
                  {data.devMode
                    ? "Welcome, ninja sensei!"
                    : "Locked. Reach Level 3 or higher to unlock."}
                </SettingsDescription>
              </div>
              <Switch
                disabled={!data.devMode}
                checked={data.devMode}
                onChange={devMode => client.writeData({ data: { devMode } })}
              />
            </SettingsItem>
          </div>
        )
      }
    </Query>
  </ResponsiveDrawer>
);

export default SettingsView;
