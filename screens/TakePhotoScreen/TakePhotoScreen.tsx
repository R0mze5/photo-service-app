import { MaterialTopTabScreenProps } from "@react-navigation/material-top-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import React, { useState, useEffect, useRef, LegacyRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Camera } from "expo-camera";

import {
  PhotoNavigationParamList,
  PhotoTabsNavigationParamList,
} from "../../typings/PhotoNavigation";
import { StyledContainer, StyledButton } from "./TakePhotoScreen.styled";
import { Loader } from "../../components/Loader";
import { constants } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styles";
import { createAssetAsync } from "expo-media-library";

export const TakePhotoScreen: React.FC<
  CompositeScreenProps<
    MaterialTopTabScreenProps<PhotoTabsNavigationParamList, "TakePhoto">,
    StackScreenProps<PhotoNavigationParamList>
  >
> = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [canTakePhoto, setCanTakePhoto] = useState(true);
  const [hasPermission, setHasPermission] = useState<null | boolean>(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const cameraRef: LegacyRef<Camera> = useRef(null);

  const takePhoto = async () => {
    if (!canTakePhoto) return;
    if (cameraRef.current) {
      setCanTakePhoto(false);
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 1,
          exif: true,
        });

        const asset = await createAssetAsync(photo.uri);

        navigation.navigate("UploadPhoto", { photo: asset });
        console.log(asset);
      } catch (error) {
        console.log(error);
        setCanTakePhoto(true);
      }
    }
  };

  const askCameraPermission = async () => {
    try {
      const cameraPermissions = await Camera.requestPermissionsAsync();
      setHasPermission(cameraPermissions.status === "granted");
      // console.log(cameraPermissions);

      // const isA = await Camera.isAvailableAsync()
    } catch (error) {
      console.log(error);
      setHasPermission(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    askCameraPermission();
    // console.log(50);
  }, []);

  return (
    <>
      {isLoading || hasPermission === null ? (
        <Loader></Loader>
      ) : hasPermission ? (
        <>
          <Camera
            style={{
              width: constants.width,
              height: constants.height / 2,
              justifyContent: "flex-end",
              alignItems: "flex-end",
              padding: 20,
            }}
            type={type}
            ref={cameraRef}
          >
            <View>
              <TouchableOpacity
                onPress={() => {
                  setType(
                    type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                  );
                }}
              >
                <Ionicons
                  name={
                    Platform.OS === "ios"
                      ? "ios-camera-reverse"
                      : "md-camera-reverse"
                  }
                  size={28}
                  color={colors.blackColor}
                ></Ionicons>
              </TouchableOpacity>
            </View>
          </Camera>
          <StyledContainer>
            <TouchableOpacity disabled={!canTakePhoto} onPress={takePhoto}>
              <StyledButton></StyledButton>
            </TouchableOpacity>
          </StyledContainer>
        </>
      ) : (
        <Text>No access to camera</Text>
      )}
    </>
  );
};
