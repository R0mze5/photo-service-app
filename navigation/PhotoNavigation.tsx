import React from "react";
import {
  PhotoNavigationParamList,
  PhotoTabsNavigationParamList,
} from "../typings/PhotoNavigation";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { SelectPhotoScreen } from "../screens/SelectPhotoScreen";
import { TakePhotoScreen } from "../screens/TakePhotoScreen/TakePhotoScreen";
import { UploadPhotoScreen } from "../screens/UploadPhotoScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { colors, theme } from "../styles";

const PhotoTabsNavigator =
  createMaterialTopTabNavigator<PhotoTabsNavigationParamList>();

const PhotoTabsNavigation: React.FC = () => {
  return (
    <PhotoTabsNavigator.Navigator
      tabBarPosition={"bottom"}
      screenOptions={{
        tabBarIndicatorStyle: {
          backgroundColor: colors.blackColor,
        },
        tabBarIndicatorContainerStyle: {
          backgroundColor: colors.lightGrayColor,
        },
        tabBarLabelStyle: {
          color: colors.blackColor,
          fontWeight: "600",
        },
      }}
    >
      <PhotoTabsNavigator.Screen
        name={"SelectPhoto"}
        component={SelectPhotoScreen}
        options={{ title: "Select" }}
      ></PhotoTabsNavigator.Screen>
      <PhotoTabsNavigator.Screen
        name={"TakePhoto"}
        options={{ title: "Take", lazy: true }}
        component={TakePhotoScreen}
      ></PhotoTabsNavigator.Screen>
    </PhotoTabsNavigator.Navigator>
  );
};

export const PhotoNavigator = createStackNavigator<PhotoNavigationParamList>();

export const PhotoNavigation: React.FC = () => {
  return (
    <PhotoNavigator.Navigator
      screenOptions={{
        gestureEnabled: true,
        headerStyle: {
          backgroundColor: theme.navigationBackgroundColor,
        },
        headerTintColor: colors.blackColor,
      }}
    >
      <PhotoNavigator.Screen
        name={"PhotoTabsNavigation"}
        component={PhotoTabsNavigation}
        options={{ headerShown: true, title: "Choose Photo" }}
      ></PhotoNavigator.Screen>
      <PhotoNavigator.Screen
        name={"UploadPhoto"}
        component={UploadPhotoScreen}
        options={{
          headerBackTitleVisible: false,
          title: "Upload",
        }}
      ></PhotoNavigator.Screen>
    </PhotoNavigator.Navigator>
  );
};
