import React, { Component } from "react";
import { Icon, Menu } from "antd";

import MapPage from "pages/MapPage";
import { Logo, StyledContent, StyledLayout, StyledHeader } from "./styles";

class App extends Component {
  render() {
    return (
      <StyledLayout>
        <StyledHeader>
          <Logo />
          <Menu
            mode="horizontal"
            defaultSelectedKeys={["map"]}
            style={{ lineHeight: "64px" }}
          >
            <Menu.Item key="map">Map</Menu.Item>
            <Menu.Item key="details">Details</Menu.Item>
            <Menu.Item key="settings">
              <Icon type="setting" />
              Settings
            </Menu.Item>
          </Menu>
        </StyledHeader>
        <StyledContent>
          <MapPage />
        </StyledContent>
      </StyledLayout>
    );
  }
}

export default App;
