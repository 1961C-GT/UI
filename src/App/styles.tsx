import styled from "styled-components";
import { Layout } from "antd";

export const Logo = styled.div`
  width: 47px;
  height: 47px;
  background-image: url("/logo.png");
  background-size: contain;
  margin: 8px 50px 8px 0;
  float: left;
`;

export const StyledLayout = styled(Layout)`
  background: linear-gradient(rgba(14, 23, 39, 1), rgba(14, 23, 39, 0));
`;

export const StyledHeader = styled(Layout.Header)`
  background: rgba(0, 0, 0, 0);
  .ant-menu {
    background: rgba(0, 0, 0, 0);
    border-bottom: 0;
    color: white;
  }
`;

export const StyledContent = styled(Layout.Content)``;
