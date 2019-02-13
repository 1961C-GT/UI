import styled from "styled-components";
import { Layout } from "antd";

export const Logo = styled.div`
  width: 72px;
  height: 72px;
  background-image: url(/logo-bw-small.png);
  background-size: contain;
  margin: 8px 16px 0 0;
  float: left;
`;

export const StyledLayout = styled(Layout)`
  background: #001529;
  z-index: -10;
`;

export const StyledHeader = styled(Layout.Header)`
  background: linear-gradient(#001529ff, #00152900);
  z-index: 10;

  .ant-menu {
    background: rgba(0, 0, 0, 0);
    border-bottom: 0;
  }

  .ant-menu-item > a {
    color: white;
  }

  .ant-menu-item-selected > a {
    color: #1890ff;
  }
`;

export const StyledContent = styled(Layout.Content)`
  background: white;
  border-radius: 5px;
  color: black;
  height: calc(100vh - 64px - 50px);
  margin: 25px;
  padding: 25px;
  z-index: 0;

  // ::after {
  //   content: "";
  //   background-image: url(/logo-bw-large.png);
  //   background-position: center;
  //   background-repeat: no-repeat;
  //   background-size: contain;
  //   opacity: 0.05;
  //   top: 64px;
  //   left: 0;
  //   bottom: 0;
  //   right: 0;
  //   position: absolute;
  //   margin: 64px;
  //   margin-top: 256px;
  //   z-index: -1;
  // }

  .ant-collapse {
    background-color: rgba(0, 0, 0, 0);
  }

  .ant-collapse-item {
    border: 0;
  }
`;
