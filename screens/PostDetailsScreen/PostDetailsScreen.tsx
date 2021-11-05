import { useQuery } from "@apollo/client";
import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { ScrollView } from "react-native";
import { Loader } from "../../components/Loader";
import { Post } from "../../components/Post";
import { GET_POST } from "../../queries";
import { Post as PostInterface } from "../../typings";
import { ScreensStackList } from "../../typings/ScreensStack";

import { StyledContainer } from "./PostDetailsScreen.styled";

export const PostDetailsScreen: React.FC<
  StackScreenProps<ScreensStackList, "PostDetails">
> = ({ route }) => {
  const postId = route.params?.id;
  const { data, loading } = useQuery<{
    postDetails: PostInterface;
  }>(GET_POST, {
    skip: !postId,
    variables: {
      postId,
    },
  });

  return (
    <ScrollView>
      {loading ? (
        <Loader></Loader>
      ) : (
        !!data?.postDetails && <Post {...data.postDetails}></Post>
      )}
    </ScrollView>
  );
};
