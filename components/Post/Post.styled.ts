import styled from "styled-components/native";

export const StyledContainer = styled.View``;
export const StyledHeader = styled.View`
  padding: 15px;
  flex-direction: row;
  align-items: center;
`;
export const StyledTouchable = styled.TouchableOpacity``;

export const StyledHeaderUserContainer = styled.View`
  margin-left: 10px;
`;

export const StyledAvatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 40px;
`;
export const StyledBoldText = styled.Text`
  font-weight: 500;
`;

export const StyledLocationText = styled.Text`
  font-size: 12px;
`;

export const StyledPostPhoto = styled.Image`
  width: 100%;
  height: 100%;
`;

export const StyledIconsContainer = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
`;

export const StyledInfoContainer = styled.View`
  padding: 10px;
`;

export const StyledCaption = styled.Text`
  margin-top: 3px;
`;

export const CommentCount = styled(StyledCaption)`
  opacity: 0.5;
  font-size: 13px;
`;
