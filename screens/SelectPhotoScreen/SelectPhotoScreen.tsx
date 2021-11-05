import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import {
  StyledContainer,
  StyledImage,
  StyledPhotoPreview,
  StyledUploadButton,
  StyledText,
} from "./SelectPhotoScreen.styled";
import * as MediaLibrary from "expo-media-library";
import { Loader } from "../../components/Loader";
import { TouchableOpacity } from "react-native-gesture-handler";
import { constants } from "../../constants";
import { MaterialTopTabScreenProps } from "@react-navigation/material-top-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import {
  PhotoNavigationParamList,
  PhotoTabsNavigationParamList,
} from "../../typings/PhotoNavigation";

export const SelectPhotoScreen: React.FC<
  CompositeScreenProps<
    MaterialTopTabScreenProps<PhotoTabsNavigationParamList, "SelectPhoto">,
    StackScreenProps<PhotoNavigationParamList>
  >
> = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<MediaLibrary.Asset | null>(
    null
  );
  const [allPhotos, setAllPhotos] = useState<MediaLibrary.Asset[]>([]);

  const getPhotos = async () => {
    try {
      const { assets } = await MediaLibrary.getAssetsAsync({
        sortBy: "creationTime",
      });

      setSelectedPhoto(assets[0]);
      setAllPhotos(assets);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const askPermission = async () => {
    try {
      const permission = await MediaLibrary.requestPermissionsAsync();
      setHasPermission(permission.granted);
      if (permission.granted) {
        getPhotos();
      }
    } catch (error) {
      setHasPermission(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    askPermission();
  }, []);

  const handleUploadSelectedPhoto = () => {
    if (selectedPhoto === null) return;
    navigation.navigate("UploadPhoto", { photo: selectedPhoto });
  };

  return (
    <StyledContainer>
      {isLoading ? (
        <Loader></Loader>
      ) : (
        <View>
          {hasPermission ? (
            <>
              <StyledImage source={{ uri: selectedPhoto?.uri }}></StyledImage>
              <StyledUploadButton>
                <TouchableOpacity onPress={handleUploadSelectedPhoto}>
                  <StyledText>Upload</StyledText>
                </TouchableOpacity>
              </StyledUploadButton>
              <ScrollView
                scrollEnabled
                style={{ height: constants.height / 4 }}
                contentContainerStyle={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                {allPhotos.map((photo) => (
                  <TouchableOpacity
                    key={photo.id}
                    onPress={() => setSelectedPhoto(photo)}
                  >
                    <StyledPhotoPreview
                      isSelected={photo.id === selectedPhoto?.id}
                      source={{ uri: photo?.uri }}
                    ></StyledPhotoPreview>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </>
          ) : (
            <Text>oops</Text>
          )}
        </View>
      )}
    </StyledContainer>
  );
};
