import React, { Component } from "react";
import { Icon, Menu } from "antd";
import {
  Link,
  Route,
  Switch,
  RouteComponentProps,
  withRouter
} from "react-router-dom";

import { Logo, StyledContent, StyledLayout, StyledHeader } from "./styles";
import routes from "./routes";

class App extends Component<RouteComponentProps> {
  render() {
    return (
      <StyledLayout>
        <StyledHeader>
          <Logo />
          <Menu
            mode="horizontal"
            defaultSelectedKeys={[this.props.location.pathname]}
            style={{ lineHeight: "64px" }}
          >
            {routes.map(
              route =>
                route.path && (
                  <Menu.Item key={route.path}>
                    <Link to={route.path}>
                      {route.icon && <Icon type={route.icon} />}
                      {route.name}
                    </Link>
                  </Menu.Item>
                )
            )}
          </Menu>
        </StyledHeader>
        <StyledContent>
          <Switch>
            {routes.map(route => (
              <Route
                exact={route.exact}
                path={route.path}
                component={route.component}
                key={`route${route.path}`}
              />
            ))}
          </Switch>
        </StyledContent>
      </StyledLayout>
    );
  }
}

export default withRouter(App);
