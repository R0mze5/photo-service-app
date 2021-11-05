import { MaterialTopTabScreenProps } from "@react-navigation/material-top-tabs";
import { Asset } from "expo-media-library";

export type PhotoTabsNavigationParamList = {
  SelectPhoto: undefined;
  TakePhoto: undefined;
};

export type PhotoNavigationParamList = {
  PhotoTabsNavigation: MaterialTopTabScreenProps<PhotoTabsNavigationParamList>;
  UploadPhoto: { photo: Asset };
};
