import styled from "styled-components/native";
import { colors } from "../../styles";

export const StyledContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

// export const StyledText = styled.Text

export const StyledButton = styled.View`
  width: 80px;
  height: 80px;
  border-radius: 50px;
  border: 10px solid ${colors.lightGrayColor};
`;
