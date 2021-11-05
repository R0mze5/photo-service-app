import { useQuery } from "@apollo/client";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import React, { useLayoutEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Loader } from "../../components/Loader";
import { UserProfile } from "../../components/UserProfile";
import { User } from "../../typings";
import { TabStackParamList } from "../../typings/TabStack";
import { ME } from "./ProfileScreen.query";

export const ProfileScreen: React.FC<
  BottomTabScreenProps<TabStackParamList, "Profile">
> = ({ navigation, route }) => {
  const { loading, data } = useQuery<{ userProfile: User }>(ME, {
    fetchPolicy: "network-only",
  });

  useLayoutEffect(() => {
    navigation.setOptions({ title: data?.userProfile?.userName });
  }, [navigation, data]);

  return (
    <ScrollView>
      {loading ? (
        <Loader></Loader>
      ) : (
        !!data?.userProfile && (
          <UserProfile {...data?.userProfile}></UserProfile>
        )
      )}
    </ScrollView>
  );
};
