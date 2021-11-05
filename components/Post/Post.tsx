import { useMutation } from "@apollo/client";
import { Ionicons } from "@expo/vector-icons";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import React, { useState } from "react";
import { Alert, Platform } from "react-native";
import Swiper from "react-native-swiper";
import { constants } from "../../constants";
import { TOGGLE_LIKE } from "../../queries";
import { theme } from "../../styles";
import { Post as PostInterface } from "../../typings";
import {
  StyledContainer,
  StyledHeader,
  StyledTouchable,
  StyledHeaderUserContainer,
  StyledAvatar,
  StyledBoldText,
  StyledLocationText,
  StyledPostPhoto,
  StyledIconsContainer,
  StyledInfoContainer,
  StyledCaption,
  CommentCount,
} from "./Post.styled";

interface PostProps extends PostInterface {}

type ScreensStackLinkNavigationProp = CompositeNavigationProp<any, any>;

export const Post: React.FC<PostProps> = ({
  id,
  files,
  user,
  location,
  likesCount,
  isLiked,
  caption,
  comments,
}) => {
  const navigation = useNavigation<ScreensStackLinkNavigationProp>();

  const [isLikedPost, setIsLikedPost] = useState(isLiked);
  const [likesCountPost, setLikesCountPost] = useState(likesCount);
  const [toggleLikeMutation] = useMutation<{ toggleLike: boolean }>(
    TOGGLE_LIKE,
    { variables: { postId: id } }
  );
  const toggleLike = async () => {
    const isNewLiked = !isLikedPost;
    const initialLikesCount = likesCountPost;
    setIsLikedPost(isNewLiked);

    const newLikesCount =
      isNewLiked === true ? initialLikesCount + 1 : initialLikesCount - 1;

    setLikesCountPost(newLikesCount);

    try {
      const { data } = await toggleLikeMutation();

      if (
        typeof data?.toggleLike !== "boolean" ||
        isNewLiked !== data?.toggleLike
      ) {
        throw new Error("not responded");
      }
    } catch (error) {
      setIsLikedPost(!isNewLiked);
      setLikesCountPost(initialLikesCount);
      Alert.alert("cant register like");
    }
  };

  const onGoToUser = () => {
    navigation.navigate("UserDetails", { username: user.userName });
  };

  // console.log(files);
  return (
    <StyledContainer>
      <StyledHeader>
        <StyledTouchable onPress={onGoToUser}>
          <StyledAvatar
            source={{ uri: user.avatar || undefined }}
          ></StyledAvatar>
        </StyledTouchable>

        <StyledHeaderUserContainer>
          <StyledTouchable onPress={onGoToUser}>
            <StyledBoldText>{user.userName}</StyledBoldText>
          </StyledTouchable>
          <StyledLocationText>{location}</StyledLocationText>
        </StyledHeaderUserContainer>
      </StyledHeader>
      <Swiper showsPagination={false} height={constants.height / 2.5}>
        {files.map((file) => (
          <StyledPostPhoto
            key={file.id}
            source={{ uri: file.url }}
          ></StyledPostPhoto>
        ))}
      </Swiper>
      <StyledInfoContainer>
        <StyledIconsContainer>
          <StyledTouchable onPress={toggleLike}>
            <Ionicons
              size={25}
              style={{ marginRight: 10 }}
              color={
                isLikedPost ? theme.likedIconColor : theme.unlikedIconColor
              }
              name={
                Platform.OS === "ios"
                  ? isLikedPost
                    ? "ios-heart"
                    : "ios-heart-outline"
                  : isLikedPost
                  ? "md-heart"
                  : "md-heart-outline"
              }
            ></Ionicons>
          </StyledTouchable>
          <StyledTouchable>
            <Ionicons
              size={25}
              style={{ marginRight: 10 }}
              name={
                Platform.OS === "ios"
                  ? "ios-chatbubble-outline"
                  : "md-chatbubble-outline"
              }
            ></Ionicons>
          </StyledTouchable>
        </StyledIconsContainer>

        <StyledTouchable>
          <StyledBoldText>
            {likesCountPost === 1 ? "1 like" : `${likesCountPost} likes`}
          </StyledBoldText>
        </StyledTouchable>

        <StyledCaption>
          <StyledBoldText>{user.userName}</StyledBoldText> {caption}
        </StyledCaption>

        <StyledTouchable>
          <CommentCount>See all {comments?.length} comments</CommentCount>
        </StyledTouchable>
      </StyledInfoContainer>
    </StyledContainer>
  );
};
