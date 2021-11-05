import React from "react";
import { AuthStackParamList } from "../../typings/AuthStack";
import {
  StyledImage,
  StyledButtonContainer,
  StyledLink,
  StyledLinkText,
} from "./AuthScreen.styled";
import { StackScreenProps } from "@react-navigation/stack";
import { AuthButton } from "../../components/AuthButton";
import { StyledMainContainer } from "../../components/StyledMainContainer";

export const AuthScreen: React.FC<
  StackScreenProps<AuthStackParamList, "Auth">
> = ({ navigation }) => {
  return (
    <StyledMainContainer>
      <StyledImage
        resizeMode={"contain"}
        source={require("../../assets/iconLogo.png")}
      ></StyledImage>
      <AuthButton
        onPress={() => navigation.navigate("SignUp")}
        text={"Create New Account"}
      />

      <StyledButtonContainer onPress={() => navigation.navigate("Login")}>
        <StyledLink>
          <StyledLinkText>Log in</StyledLinkText>
        </StyledLink>
      </StyledButtonContainer>
    </StyledMainContainer>
  );
};
