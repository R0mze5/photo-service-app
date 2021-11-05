import { useQuery } from "@apollo/client";
import { StackScreenProps } from "@react-navigation/stack";
import React, { useLayoutEffect } from "react";
import { ScrollView } from "react-native";
import { Loader } from "../../components/Loader";
import { UserProfile } from "../../components/UserProfile";
import { User } from "../../typings";
import { ScreensStackList } from "../../typings/ScreensStack";
import { USER_DETAILS } from "./UserDetailsScreen.query";

import { StyledContainer } from "./UserDetailsScreen.styled";

export const UserDetailsScreen: React.FC<
  StackScreenProps<ScreensStackList, "UserDetails">
> = ({ route, navigation }) => {
  const username = route.params?.username;
  const { data, loading } = useQuery<{
    userDetails: User;
  }>(USER_DETAILS, {
    skip: !username,
    variables: {
      username,
    },
  });

  useLayoutEffect(() => {
    navigation.setOptions({ title: username });
  }, [username]);

  return (
    <ScrollView>
      {loading ? (
        <Loader></Loader>
      ) : (
        !!data?.userDetails && (
          <UserProfile {...data?.userDetails}></UserProfile>
        )
      )}
    </ScrollView>
  );
};
