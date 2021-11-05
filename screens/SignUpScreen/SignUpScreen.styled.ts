import styled from "styled-components/native";
import { constants } from "../../constants";

export const StyledFBContainer = styled.View`
  padding-top: 25px;
  margin-top: 25px;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.authDivider};
  border-style: solid;
`;
