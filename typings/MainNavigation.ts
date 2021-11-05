import {
  BottomTabNavigationProp,
  BottomTabScreenProps,
} from "@react-navigation/bottom-tabs";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { MessagesNavigationParamList } from "./MessagesNavigation";
import { PhotoNavigationParamList } from "./PhotoNavigation";
import { TabStackParamList } from "./TabStack";

export type MainNavigationParamList = {
  TabNavigation: BottomTabNavigationProp<TabStackParamList>;
  PhotoNavigation: StackNavigationProp<PhotoNavigationParamList>;
  MessagesNavigation: StackNavigationProp<MessagesNavigationParamList>;
};
