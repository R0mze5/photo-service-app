import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthScreen } from "../screens/AuthScreen";
import { ConfirmScreen } from "../screens/ConfirmScreen";
import { LoginScreen } from "../screens/LoginScreen";
import { SignUpScreen } from "../screens/SignUpScreen";
import { AuthStackParamList } from "../typings/AuthStack";

export const AuthStack = createStackNavigator<AuthStackParamList>();

export const AuthNavigation: React.FC = () => {
  return (
    <AuthStack.Navigator
      initialRouteName={"Auth"}
      screenOptions={{ headerShown: false, gestureEnabled: true }}
    >
      <AuthStack.Screen name={"Auth"} component={AuthScreen}></AuthStack.Screen>
      <AuthStack.Screen
        name={"Login"}
        component={LoginScreen}
      ></AuthStack.Screen>
      <AuthStack.Screen
        name={"Confirm"}
        component={ConfirmScreen}
      ></AuthStack.Screen>
      <AuthStack.Screen
        name={"SignUp"}
        component={SignUpScreen}
      ></AuthStack.Screen>
    </AuthStack.Navigator>
  );
};
