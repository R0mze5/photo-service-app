import React from "react";
import useInput from "../../hooks/useInput";
import { theme } from "../../styles";
import { StyledInput } from "./SearchBar.styled";

interface SearchBarProps {
  onSubmit: (value: string) => void;
  initialValue: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  initialValue,
  onSubmit,
}) => {
  const searchInput = useInput(initialValue);

  const handleSubmit = () => {
    onSubmit(searchInput.value);
  };

  return (
    <StyledInput
      onChangeText={searchInput.onChange}
      keyboardType={"default"}
      returnKeyType="search"
      placeholder={"Search"}
      value={searchInput.value}
      onSubmitEditing={handleSubmit}
      placeholderTextColor={theme.searchPlaceholderColor}
    ></StyledInput>
  );
};
