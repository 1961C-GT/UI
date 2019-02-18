import styled from "styled-components";
import { Card } from "antd";

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
  background-image: url(/logo-bw-small.png);
  background-size: contain;
  opacity: 0.75;
  pointer-events: none;

  @media only screen and (orientation: landscape) {
    width: 192px;
    height: 192px;
    background-image: url(/logo-bw-large.png);
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
    max-height: calc(100% - 48px);
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
