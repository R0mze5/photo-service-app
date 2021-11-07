import { useMutation } from "@apollo/client";
import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { Alert, Keyboard, TouchableWithoutFeedback } from "react-native";
import { AuthButton } from "../../components/AuthButton";
import useInput from "../../hooks/useInput";
import { colors } from "../../styles";
import { PostCreate } from "../../typings";
import { Post as PostInterface } from "../../typings";
import { PhotoNavigationParamList } from "../../typings/PhotoNavigation";
import { CREATE_POST } from "./UploadPhotoScreen.query";
import {
  StyledContainer,
  StyledImageWrapper,
  StyledImage,
  StyledForm,
  StyledTextInput,
} from "./UploadPhotoScreen.styled";

import axios from "axios";
import { GET_MY_FEED } from "../../queries";

const apiUrl = process.env.API_URI || "";

export const UploadPhotoScreen: React.FC<
  StackScreenProps<PhotoNavigationParamList, "UploadPhoto">
> = ({ route, navigation }) => {
  const photoAsset = route.params.photo;

  const [isLoading, setIsLoading] = useState(false);

  const captionInput = useInput("");
  const locationInput = useInput("");

  const [createPostMutation] = useMutation<{ createPost: PostInterface }>(
    CREATE_POST,
    { refetchQueries: [GET_MY_FEED] }
  );

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const formData = new FormData();

      formData.append("file", {
        name: photoAsset.filename,
        type: "image/jpeg",
        uri: photoAsset.uri,
      } as any);

      const response = await axios.post(apiUrl + "/api/upload", formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      });

      // const response = await fetch(apiUrl + "/api/upload", {
      //   method: "POST",
      //   body: formData,
      //   headers: {
      //     "content-type": "multipart/form-data",
      //   },
      // });

      // console.log(response);

      const file = response?.data;

      if (file?.location) {
        const postData = {
          caption: captionInput.value,
          location: locationInput.value,
          files: [file.location],
        } as PostCreate;

        const postResponse = await createPostMutation({
          variables: postData,
        });

        console.log(postResponse);

        if (postResponse?.data?.createPost?.id) {
          navigation.navigate("TabNavigation" as any);
        }
      } else {
        Alert.alert("Post creation error");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Can't upload file");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!photoAsset) {
      navigation.navigate("PhotoTabsNavigation", {
        screen: "SelectPhoto",
        params: {},
      } as any);
    }
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <StyledContainer>
        <StyledImageWrapper>
          <StyledImage source={{ uri: photoAsset.uri }}></StyledImage>
          <StyledForm>
            <StyledTextInput
              onChangeText={captionInput.onChange}
              value={captionInput.value}
              placeholder="Caption"
              multiline
              placeholderTextColor={colors.darkGrayColor}
            ></StyledTextInput>
            <StyledTextInput
              onChangeText={locationInput.onChange}
              value={locationInput.value}
              placeholder="Location"
              multiline
              placeholderTextColor={colors.darkGrayColor}
            ></StyledTextInput>

            <AuthButton
              onPress={handleSubmit}
              loading={isLoading}
              text="Upload"
            />
          </StyledForm>
        </StyledImageWrapper>
      </StyledContainer>
    </TouchableWithoutFeedback>
  );
};
