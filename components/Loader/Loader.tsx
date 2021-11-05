import React from "react";
import { ActivityIndicator } from "react-native";
import { theme } from "../../styles";
import { StyledContainer } from "./Loader.styled";

export const Loader: React.FC = () => {
  return (
    <StyledContainer>
      <ActivityIndicator color={theme.mainLoaderColor}></ActivityIndicator>
    </StyledContainer>
  );
};
