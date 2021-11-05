import styled from "styled-components/native";
import { colors } from "../../styles";

export const StyledContainer = styled.View`
  flex: 1;
  padding: 20px;
`;

export const StyledImageWrapper = styled.View`
  flex-direction: row;
`;
export const StyledImage = styled.Image`
  height: 80px;
  width: 80px;
  margin-right: 30px;
`;

export const StyledForm = styled.View``;

export const StyledTextInput = styled.TextInput`
  margin-bottom: 10px;
  border: 0px solid ${colors.darkGrayColor};
  border-bottom-width: 1px;
  padding: 5px 0;
`;
