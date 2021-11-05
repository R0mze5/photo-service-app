import React from "react";
import { Text, TouchableOpacity } from "react-native";

import { StyledContainer } from "./DialogsScreen.styled";

export const DialogsScreen: React.FC = () => {
  return (
    <StyledContainer>
      <TouchableOpacity>
        <Text>DialogsScreen</Text>
      </TouchableOpacity>
    </StyledContainer>
  );
};
