import React, { Component } from "react";
import { Icon, Layout, Menu } from "antd";

import MapPage from "pages/MapPage";
import { Logo } from "./styles";

const { Header, Content } = Layout;

class App extends Component {
  render() {
    return (
      <Layout className="layout">
        <Header>
          <Logo />
          <Menu
            theme="dark"
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
        </Header>
        <Content>
          <MapPage />
        </Content>
      </Layout>
    );
  }
}

export default App;
