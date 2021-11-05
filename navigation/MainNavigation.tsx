import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TabNavigation } from "./TabNavigation";
import { PhotoNavigation } from "./PhotoNavigation";
import { MainNavigationParamList } from "../typings/MainNavigation";
import { MessagesNavigation } from "./MessagesNavigation";

export const MainStack = createStackNavigator<MainNavigationParamList>();

export const MainNavigation: React.FC = () => {
  return (
    <MainStack.Navigator
      initialRouteName={"PhotoNavigation"}
      screenOptions={{ headerShown: false, gestureEnabled: true }}
    >
      <MainStack.Screen
        name={"TabNavigation"}
        component={TabNavigation}
      ></MainStack.Screen>
      <MainStack.Screen
        options={{
          presentation: "modal",
          gestureEnabled: true,
          gestureDirection: "vertical",
        }}
        name={"PhotoNavigation"}
        component={PhotoNavigation}
      ></MainStack.Screen>
      <MainStack.Screen
        name={"MessagesNavigation"}
        component={MessagesNavigation}
      ></MainStack.Screen>
    </MainStack.Navigator>
  );
};
