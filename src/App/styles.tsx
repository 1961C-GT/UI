import styled from "styled-components";
import { Card, Drawer } from "antd";

export const AppContainer = styled.div`
  // Layout
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;

  ::before {
    // Layout
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    // Visual
    background: ${props => props.theme.background};
    content: "";
  }
`;

export const Logo = styled.div`
  // Layout
  position: absolute;
  z-index: 10;
  // Box Model
  width: 64px;
  height: 64px;
  margin: 24px;
  // Visual
  background-image: url(/logo-bw-large.png);
  background-size: contain;
  // Misc
  pointer-events: none;
  @media only screen and (orientation: landscape) {
    // Box Model
    width: 192px;
    height: 192px;
  }
`;

export const MapPane = styled.div`
  position: absolute;
  height: 62%;
  width: 100vw;
  @media only screen and (orientation: landscape) {
    height: 100vh;
  }
`;

export const ContentPane = styled(Card)`
  // Layout
  position: absolute;
  top: 62%;
  bottom: 0;
  width: 100vw;
  z-index: 10;
  // Misc
  overflow: scroll;
  @media only screen and (orientation: landscape) {
    // Layout
    top: 0;
    right: 0;
    // Box Model
    width: 30%;
    height: fit-content;
    max-height: 100%;
    margin: 24px;
    // Visual
    background-color: rgba(255, 255, 255, 0.95);
  }
`;

export const ContentHeader = styled.div`
  // Layout
  display: flex;
  justify-content: space-between;
  align-items: center;
  // Box Model
  padding: 0 8px 16px 16px;
  // Visual
  font-size: 24px;
`;

export const ResponsiveDrawer = styled(Drawer)`
  .ant-drawer-content-wrapper {
    width: 90% !important;
    @media only screen and (orientation: landscape) {
      width: 38% !important;
    }
  }
`;

export const SettingsItem = styled.div`
  // Layout
  display: flex;
  justify-content: space-between;
  align-items: center;
  // Box Model
  padding: 12px;
`;

export const SettingsLabel = styled.div`
  font-size: 16px;
`;

export const SettingsDescription = styled.div`
  padding-right: 16px;
  font-size: 12px;
`;
