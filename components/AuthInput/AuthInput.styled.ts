import styled from "styled-components/native";
import { constants } from "../../constants";

export const StyledInputContainer = styled.View`
  margin-bottom: 10px;
`;
export const StyledInput = styled.TextInput`
  background-color: ${({ theme }) => theme.authInputBgColor};
  padding: 10px;
  width: 240px;
  max-width: ${constants.width - 40}px;
  border: 1px solid ${({ theme }) => theme.authInputBorderColor};
  border-radius: ${({ theme }) => theme.authInputBorderRadius};
`;
