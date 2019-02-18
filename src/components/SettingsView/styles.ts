import styled from "styled-components";
import { Drawer } from "antd";

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
