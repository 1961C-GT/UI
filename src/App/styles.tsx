import styled from "styled-components";
import { Card } from "antd";

export const AppContainer = styled.div`
  // Layout
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  display: flex;
  justify-content: space-between;
  // Box Model
  padding: 24px;

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
  z-index: 10;
  // Box Model
  width: 128px;
  height: 128px;
  // Visual
  background-image: url(/logo-bw-small.png);
  background-size: contain;
  // Misc
  pointer-events: none;
`;

export const ContentPane = styled(Card)`
  // Layout
  flex: 0 0 30%;
  z-index: 10;
  // Box Model
  height: fit-content;
  max-height: 100%;
  // Visual
  background-color: rgba(255, 255, 255, 0.95);
  // Misc
  overflow: scroll;
`;

export const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  padding-top: 0;
  padding-right: 8px;
  font-size: 24px;
`;
