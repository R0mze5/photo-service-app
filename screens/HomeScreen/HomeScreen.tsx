import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { View, Text, ScrollView, RefreshControl, Alert } from "react-native";
import { Loader } from "../../components/Loader";
import { Post } from "../../components/Post";
import { StyledMainContainer } from "../../components/StyledMainContainer";
import { GET_MY_FEED } from "../../queries";
import { Post as PostInterface } from "../../typings";
import { StyledText } from "./HomeScreen.styled";

export const HomeScreen = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { data, loading, refetch } = useQuery<{
    getFeed: Array<PostInterface>;
  }>(GET_MY_FEED);

  const refresh = async () => {
    setIsRefreshing(true);
    try {
      await refetch();
    } catch (error) {
      Alert.alert((error as { message: string })?.message);
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={refresh} />
      }
      // on={() => console.log(30)}
    >
      {loading ? (
        <Loader></Loader>
      ) : (
        data?.getFeed?.map((post) => <Post key={post.id} {...post}></Post>)
      )}
    </ScrollView>
  );

  // return (
  //   <StyledMainContainer>
  //     {loading ? <Loader></Loader> : <ScrollView></ScrollView>}
  //   </StyledMainContainer>
  // );
};
