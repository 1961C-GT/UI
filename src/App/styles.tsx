import styled from "styled-components";
import { Card, Drawer } from "antd";

export const AppContainer = styled.div`
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;

  ::before {
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    background: ${props => props.theme.background};
    content: "";
  }
`;

export const Logo = styled.div`
  position: absolute;
  z-index: 10;
  width: 64px;
  height: 64px;
  margin: 24px;
  background-image: url(/logo-bw-large.png);
  background-size: contain;
  pointer-events: none;

  @media only screen and (orientation: landscape) {
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
  position: absolute;
  top: 62%;
  bottom: 0;
  width: 100vw;
  z-index: 10;
  overflow: scroll;

  @media only screen and (orientation: landscape) {
    top: 0;
    right: 0;
    width: 30%;
    height: fit-content;
    max-height: 100%;
    margin: 24px;
    background-color: rgba(255, 255, 255, 0.95);
  }
`;

export const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px 16px 16px;
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
`;

export const SettingsLabel = styled.div`
  font-size: 16px;
`;

export const SettingsDescription = styled.div`
  padding-right: 16px;
  font-size: 12px;
`;
