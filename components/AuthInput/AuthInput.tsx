import React from "react";
import { KeyboardType, ReturnKeyTypeOptions } from "react-native";
import { StyledInputContainer, StyledInput } from "./AuthInput.styled";

interface AuthInputProps {
  placeholder: string;
  value: string;
  keyboardType?: KeyboardType;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  onChange: (value: string) => void;
  returnKeyType?: ReturnKeyTypeOptions;
  onSubmitEditing?: () => void;
  autoCorrect?: boolean;
}

export const AuthInput: React.FC<AuthInputProps> = ({
  placeholder,
  value,
  keyboardType = "default",
  autoCapitalize = "none",
  onChange,
  returnKeyType = "done",
  onSubmitEditing,
  autoCorrect = true,
}) => {
  return (
    <StyledInputContainer>
      <StyledInput
        onChangeText={onChange}
        keyboardType={keyboardType}
        placeholder={placeholder}
        value={value}
        autoCapitalize={autoCapitalize}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
        autoCorrect={autoCorrect}
      ></StyledInput>
    </StyledInputContainer>
  );
};
