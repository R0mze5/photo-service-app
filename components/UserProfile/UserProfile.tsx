import { useMutation } from "@apollo/client";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Alert, Platform, TouchableOpacity } from "react-native";
import Swiper from "react-native-swiper";
import { constants } from "../../constants";
import { TOGGLE_LIKE } from "../../queries";
import { colors, theme } from "../../styles";
import { User as UserInterface } from "../../typings";
import { Post } from "../Post";
import { SquarePhoto } from "../SquarePhoto";
import {
  StyledHeader,
  StyledHeaderColumn,
  StyledProfileAvatar,
  StyledProfileStats,
  StyledStat,
  StyledStatName,
  StyledProfileMeta,
  StyledProfileBio,
  StyledBoldText,
  StyledButtonContainer,
  StyledButton,
} from "./UserProfile.styled";

interface UserProps extends UserInterface {}

export const UserProfile: React.FC<UserProps> = ({
  id,
  posts,
  avatar,
  postsCount,
  likes,
  followersCount,
  followingCount,
  bio,
  fullName,
}) => {
  const [isGrid, setIsGrid] = useState(true);
  // console.log(files);
  return (
    <>
      <StyledHeader>
        <StyledHeaderColumn>
          <StyledProfileAvatar
            source={{ uri: avatar || undefined }}
          ></StyledProfileAvatar>
        </StyledHeaderColumn>
        <StyledHeaderColumn>
          <StyledProfileStats>
            <StyledStat>
              <StyledBoldText>{postsCount}</StyledBoldText>
              <StyledStatName>Posts</StyledStatName>
            </StyledStat>
            <StyledStat>
              <StyledBoldText>{followersCount}</StyledBoldText>
              <StyledStatName>Followers</StyledStatName>
            </StyledStat>
            <StyledStat>
              <StyledBoldText>{followingCount}</StyledBoldText>
              <StyledStatName>Following</StyledStatName>
            </StyledStat>
          </StyledProfileStats>
        </StyledHeaderColumn>
      </StyledHeader>
      <StyledProfileMeta>
        <StyledBoldText>{fullName}</StyledBoldText>
        <StyledProfileBio>{bio}</StyledProfileBio>
      </StyledProfileMeta>
      <StyledButtonContainer>
        <TouchableOpacity onPress={() => setIsGrid(true)}>
          <StyledButton>
            <Ionicons
              color={isGrid ? colors.blackColor : colors.darkGrayColor}
              size={26}
              name={Platform.OS === "ios" ? "ios-grid" : "md-grid"}
            ></Ionicons>
          </StyledButton>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsGrid(false)}>
          <StyledButton>
            <Ionicons
              color={!isGrid ? colors.blackColor : colors.darkGrayColor}
              size={32}
              name={Platform.OS === "ios" ? "ios-list" : "md-list"}
            ></Ionicons>
          </StyledButton>
        </TouchableOpacity>
      </StyledButtonContainer>
      {posts?.map((post) =>
        !isGrid ? (
          <Post key={post.id} {...post}></Post>
        ) : (
          <SquarePhoto key={post.id} {...post}></SquarePhoto>
        )
      )}
    </>
  );
};
