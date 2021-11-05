import { useMutation } from "@apollo/client";
import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
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

export const UploadPhotoScreen: React.FC<
  StackScreenProps<PhotoNavigationParamList, "UploadPhoto">
> = ({ route, navigation }) => {
  const photoAsset = route.params.photo;

  const [isLoading, setIsLoading] = useState(false);
  const captionInput = useInput("");
  const locationInput = useInput("");

  const [createPostMutation] =
    useMutation<{ createPost: PostInterface }>(CREATE_POST);

  const handleSubmit = async () => {
    const postValues: PostCreate = {
      files: [photoAsset.uri],
      location: locationInput.value,
      caption: captionInput.value,
    };

    try {
      const post = await createPostMutation({ variables: postValues });
      console.log(post);

      if (post.data) {
        const postId = post.data?.createPost?.id;

        if (postId) {
          // navigation.navigate()
        }
      }
    } catch (error) {
      console.log(error);
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
