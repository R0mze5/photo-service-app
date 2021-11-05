import React from "react";
import { ActivityIndicator } from "react-native";
import {
  StyledButtonContainer,
  StyledButton,
  StyledButtonText,
} from "./AuthButton.styled";

interface AuthButtonProps {
  text: string;
  onPress: () => void;
  loading?: boolean;
  bgColor?: string;
}

export const AuthButton: React.FC<AuthButtonProps> = ({
  text,
  onPress,
  loading,
  bgColor,
}) => {
  return (
    <StyledButtonContainer disabled={loading} onPress={onPress}>
      <StyledButton bgColor={bgColor}>
        {loading ? (
          <ActivityIndicator color={"#fff"}></ActivityIndicator>
        ) : (
          <StyledButtonText>{text}</StyledButtonText>
        )}
      </StyledButton>
    </StyledButtonContainer>
  );
};
