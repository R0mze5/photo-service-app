import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { MessagesNavigationParamList } from "../typings/MessagesNavigation";
import { DialogsScreen } from "../screens/DialogsScreen";
import { MessagesScreen } from "../screens/MessagesScreen";

export const MessagesStack =
  createStackNavigator<MessagesNavigationParamList>();

export const MessagesNavigation: React.FC = () => {
  return (
    <MessagesStack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: true }}
    >
      <MessagesStack.Screen
        name={"Dialogs"}
        component={DialogsScreen}
      ></MessagesStack.Screen>
      <MessagesStack.Screen
        name={"Messages"}
        component={MessagesScreen}
      ></MessagesStack.Screen>
    </MessagesStack.Navigator>
  );
};
