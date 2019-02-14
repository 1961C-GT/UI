import styled from "styled-components";
import { Collapse } from "antd";

export const PanelHeader = styled.div`
  display: flex;
  padding-right: 10px;
`;
export const HeaderName = styled.div`
  flex: 1;
`;
export const HeaderType = styled.div`
  flex: 0;
`;

export const StyledCollapse = styled(Collapse)`
  background: transparent;
`;
