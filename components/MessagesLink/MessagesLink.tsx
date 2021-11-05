import { Ionicons } from "@expo/vector-icons";
import { CompositeNavigationProp, useNavigation } from "@react-navigation/core";
import React from "react";
import { Platform } from "react-native";
import { theme } from "../../styles";
import { StyledContainer } from "./MessagesLink.styled";

// interface MessagesLinkProps {}
type MessagesLinkNavigationProp = CompositeNavigationProp<any, any>;

export const MessagesLink = () => {
  const navigation = useNavigation<MessagesLinkNavigationProp>();

  return (
    <StyledContainer onPress={() => navigation.navigate("MessagesNavigation")}>
      <Ionicons
        name={Platform.OS === "ios" ? "ios-paper-plane" : "paper-plane"}
        color={theme.headerIconColor}
        size={26}
      ></Ionicons>
    </StyledContainer>
  );
};
