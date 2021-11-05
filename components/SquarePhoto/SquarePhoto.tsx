import React from "react";
import { PostSearch } from "../../typings";
import { StyledContainer, StyledImage } from "./SquarePhoto.styled";
import {
  useNavigation,
  CompositeNavigationProp,
} from "@react-navigation/native";
import { ScreensStackList } from "../../typings/ScreensStack";

type ScreensStackLinkNavigationProp = CompositeNavigationProp<any, any>;

export const SquarePhoto: React.FC<PostSearch> = ({ files, id }) => {
  const uri = files[0]?.url;

  const navigation = useNavigation<ScreensStackLinkNavigationProp>();

  if (!uri) return null;

  return (
    <StyledContainer onPress={() => navigation.navigate("PostDetails", { id })}>
      <StyledImage source={{ uri }}></StyledImage>
    </StyledContainer>
  );
};
