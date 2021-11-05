import styled from "styled-components/native";
import { constants } from "../../constants";

export const StyledInput = styled.TextInput`
  padding: 10px;
  width: ${constants.width - 40}px;
  margin-left: 5px;
  height: 35px;
  border-radius: 5px;
  text-align: center;

  background-color: ${({ theme }) => theme.searchBgColor};
`;
