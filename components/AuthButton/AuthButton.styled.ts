import styled from "styled-components/native";
import { constants } from "../../constants";

export const StyledButtonContainer = styled.TouchableOpacity``;

export const StyledButton = styled.View<{ bgColor?: string }>`
  background-color: ${({ theme, bgColor }) =>
    bgColor || theme.authButtonBgColor};
  padding: 10px;
  width: 240px;
  max-width: ${constants.width - 40}px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
`;
export const StyledButtonText = styled.Text`
  color: ${({ theme }) => theme.authButtonTextColor};
  font-weight: 600;
`;
