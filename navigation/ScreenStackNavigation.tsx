import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { PostDetailsScreen } from "../screens/PostDetailsScreen";
import { theme } from "../styles";
import { UserDetailsScreen } from "../screens/UserDetailsScreen";
import { ScreensStackList } from "../typings/ScreensStack";

export const ScreensStack = createStackNavigator<ScreensStackList>();

export const ScreenStackNavigation: React.FC = ({ children }) => {
  return (
    <ScreensStack.Navigator
      defaultScreenOptions={{
        headerTintColor: theme.screenStackNavigatorHeaderTintColor,
      }}
    >
      {children}
      <ScreensStack.Screen
        options={{
          title: "Photo",
        }}
        name="PostDetails"
        component={PostDetailsScreen}
      />
      <ScreensStack.Screen
        options={{
          title: "User",
        }}
        name="UserDetails"
        component={UserDetailsScreen}
      />
    </ScreensStack.Navigator>
  );
};
