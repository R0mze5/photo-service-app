import { StackNavigationProp } from "@react-navigation/stack";
import { ScreensStackList } from "./ScreensStack";

export type TabStackParamList = {
  Home: StackNavigationProp<ScreensStackList>;
  Notifications: StackNavigationProp<ScreensStackList>;
  Add: undefined;
  Profile: undefined;
  Search: undefined;
};
