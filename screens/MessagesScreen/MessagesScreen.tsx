import React from "react";
import { Text, TouchableOpacity } from "react-native";

import { StyledContainer } from "./MessagesScreen.styled";

export const MessagesScreen: React.FC = () => {
  return (
    <StyledContainer>
      <TouchableOpacity>
        <Text>MessagesScreen</Text>
      </TouchableOpacity>
    </StyledContainer>
  );
};
