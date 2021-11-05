import styled from "styled-components/native";
import { constants } from "../../constants";

export const StyledImage = styled.Image`
  width: ${constants.width / 6}px;
  height: ${constants.width / 6}px;
  margin-bottom: 20px;
`;

export const StyledButtonContainer = styled.TouchableOpacity``;

export const StyledLink = styled.View`
  margin-top: 20px;
`;

export const StyledLinkText = styled.Text`
  color: ${({ theme }) => theme.authLinkTextColor};
`;
