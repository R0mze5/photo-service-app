import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { TabStackParamList } from "../typings/TabStack";
import { HomeScreen } from "../screens/HomeScreen";
import { NotificationsScreen } from "../screens/NotificationsScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { SearchScreen } from "../screens/SearchScreen";
import { View, Image, Platform } from "react-native";
import { MainNavigationParamList } from "../typings/MainNavigation";
import { StackScreenProps } from "@react-navigation/stack";
import { MessagesLink } from "../components/MessagesLink";
import { constants } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../styles";
import { ScreensStack, ScreenStackNavigation } from "./ScreenStackNavigation";

const Tab = createBottomTabNavigator<TabStackParamList>();

export const TabNavigation: React.FC<
  StackScreenProps<MainNavigationParamList, "TabNavigation">
> = ({ navigation }) => {
  return (
    <Tab.Navigator
      initialRouteName={"Home"}
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: { backgroundColor: theme.navigationBackgroundColor },
        headerStyle: {
          backgroundColor: theme.navigationBackgroundColor,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              color={
                focused
                  ? theme.bottomNavigationIconColor
                  : theme.bottomNavigationIconFocusColor
              }
              size={22}
              name={Platform.OS === "ios" ? "ios-home" : "md-home"}
            />
          ),
        }}
        name={"Home"}
      >
        {() => (
          <ScreenStackNavigation>
            <ScreensStack.Screen
              options={{
                headerRight: MessagesLink,
                headerTitle: () => (
                  <Image
                    source={require("../assets/iconLogo.png")}
                    height={35}
                    width={35}
                    style={{
                      left: constants.width / 2 - 35,
                    }}
                    resizeMode="contain"
                  ></Image>
                ),
              }}
              name="Main"
              component={HomeScreen}
            />
          </ScreenStackNavigation>
        )}
      </Tab.Screen>
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              color={
                focused
                  ? theme.bottomNavigationIconColor
                  : theme.bottomNavigationIconFocusColor
              }
              size={22}
              name={Platform.OS === "ios" ? "ios-search" : "md-search"}
            />
          ),
        }}
        name={"Search"}
      >
        {() => (
          <ScreenStackNavigation>
            <ScreensStack.Screen
              name="Main"
              component={SearchScreen}
              // options={{
              //   headerBackTitle: "asdfasf",
              //   headerBackTitleVisible: false,
              // }}
            />
          </ScreenStackNavigation>
        )}
      </Tab.Screen>
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              color={
                focused
                  ? theme.bottomNavigationIconColor
                  : theme.bottomNavigationIconFocusColor
              }
              size={26}
              name={Platform.OS === "ios" ? "ios-add" : "md-add"}
            />
          ),
        }}
        name={"Add"}
        component={View}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate("PhotoNavigation");
          },
        })}
      ></Tab.Screen>
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              color={
                focused
                  ? theme.bottomNavigationIconColor
                  : theme.bottomNavigationIconFocusColor
              }
              size={22}
              name={
                Platform.OS === "ios" ? "ios-heart-outline" : "md-heart-outline"
              }
            />
          ),
        }}
        name={"Notifications"}
        component={NotificationsScreen}
      ></Tab.Screen>
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              color={
                focused
                  ? theme.bottomNavigationIconColor
                  : theme.bottomNavigationIconFocusColor
              }
              size={22}
              name={Platform.OS === "ios" ? "ios-person" : "md-person"}
            />
          ),
        }}
        name={"Profile"}
      >
        {() => (
          <ScreenStackNavigation>
            <ScreensStack.Screen name="Main" component={ProfileScreen} />
          </ScreenStackNavigation>
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};
