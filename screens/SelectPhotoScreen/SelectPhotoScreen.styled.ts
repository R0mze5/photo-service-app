import styled from "styled-components/native";
import { constants } from "../../constants";
import { colors } from "../../styles";

export const StyledContainer = styled.View`
  flex: 1;
  /* justify-content: center;
  align-items: center; */
`;

export const StyledImage = styled.Image`
  width: ${constants.width}px;
  height: ${constants.height / 2}px;
`;

export const StyledScrollPhotosContainer = styled.ScrollView`
  /* flex-direction: row; */
  /* width: ${constants.width}px; */
  height: ${constants.height / 2}px;
`;

export const StyledPhotoPreview = styled.Image<{ isSelected: boolean }>`
  width: ${constants.width / 3}px;
  height: ${constants.width / 3}px;
  opacity: ${({ isSelected }) => (isSelected ? 0.6 : 1)};
`;

export const StyledUploadButton = styled.View`
  width: 100px;
  height: 30px;
  position: absolute;
  right: 5px;
  top: 15px;
  background-color: ${colors.blueColor};
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`;

export const StyledText = styled.Text`
  color: ${colors.whiteColor};
  font-weight: 600;
`;
