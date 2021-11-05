import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { AuthButton } from "../../components/AuthButton";
import { AuthInput } from "../../components/AuthInput";
import { StyledMainContainer } from "../../components/StyledMainContainer";
import useInput from "../../hooks/useInput";
import { AuthStackParamList } from "../../typings/AuthStack";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import { useMutation } from "@apollo/client";
import { CREATE_ACCOUNT, LOG_USER_IN } from "../../queries";
import { emailRegExp } from "../../variables";
import { StyledFBContainer } from "./SignUpScreen.styled";
import * as Facebook from "expo-facebook";
import * as GoogleSignIn from "expo-google-sign-in";

export const SignUpScreen: React.FC<
  StackScreenProps<AuthStackParamList, "SignUp">
> = ({ route, navigation }) => {
  const { params } = route;

  const firstNameInput = useInput("");
  const lastNameInput = useInput("");
  const usernameInput = useInput("");
  const emailInput = useInput(params?.email ?? "");
  const [userAvatar, setUserAvatar] = useState<string | undefined>();

  const [requestSecretMutation, { loading }] = useMutation<{
    requestSecret: boolean;
  }>(LOG_USER_IN);

  const [createAccountMutation] =
    useMutation<{ createAccount: boolean }>(CREATE_ACCOUNT);

  const handleSignUp = async () => {
    if (usernameInput.value === "" || emailInput.value === "") {
      Alert.alert("Email and Username fields required");
    } else if (!emailRegExp.test(emailInput.value)) {
      Alert.alert("Email is not valid");
    } else {
      try {
        const createAccount = await createAccountMutation({
          variables: {
            userName: usernameInput.value,
            email: emailInput.value,
            firstName: firstNameInput.value,
            lastName: lastNameInput.value,
            avatar: userAvatar,
          },
        });

        if (!createAccount?.data?.createAccount) {
          Alert.alert("You don't have an account yet, create one");
        } else {
          const { data } = await requestSecretMutation({
            variables: { email: emailInput.value },
          });

          if (data?.requestSecret) {
            navigation.navigate("Confirm", { email: emailInput.value });
          } else {
            Alert.alert("Account not found");
          }
        }
      } catch (error) {
        Alert.alert((error as { message: string })?.message);
      }
    }
  };

  async function facebookLogIn() {
    try {
      await Facebook.initializeAsync({
        appId: process.env?.FACEBOOK_APP_ID,
      });
      const facebookResponse = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile", "email"],
      });

      if (facebookResponse.type === "success" && facebookResponse.token) {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${facebookResponse.token}&fields=id,last_name,email,about,first_name`
        );

        const data = await response.json();

        if (data) {
          const { last_name, email, first_name } = data;
          firstNameInput.onChange(first_name);
          emailInput.onChange(email);
          lastNameInput.onChange(last_name);
          if (typeof email === "string") {
            usernameInput.onChange(email.split("@")[0]);
          }

          await handleSignUp();
        }
      } else {
        // type === 'cancel'
      }
    } catch (error: any) {
      alert(`Facebook Login Error: ${error?.message}`);
    }
  }

  const googleLogin = async () => {
    try {
      await GoogleSignIn.initAsync({
        // You may ommit the clientId when the firebase `googleServicesFile` is configured
        clientId: process.env?.GOOGLE_CLIENT_ID,
        scopes: ["profile", "email"],
        // Provide other custom options...
      });

      try {
        await GoogleSignIn.askForPlayServicesAsync();
        const { type, user } = await GoogleSignIn.signInAsync();

        if (type === "success") {
          if (user) {
            const { firstName, email, lastName, photoURL } = user;

            firstNameInput.onChange(firstName || "");
            emailInput.onChange(email);
            lastNameInput.onChange(lastName || "");
            setUserAvatar(photoURL);
            if (typeof email === "string") {
              usernameInput.onChange(email.split("@")[0]);
            }

            handleSignUp();
          }
        }
      } catch ({ message }) {
        alert("login: Error:" + message);
      }
    } catch ({ message }) {
      alert("GoogleSignIn.initAsync(): " + message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <StyledMainContainer>
        <AuthInput
          returnKeyType={"next"}
          placeholder={"First Name"}
          autoCapitalize={"words"}
          {...firstNameInput}
        ></AuthInput>
        <AuthInput
          returnKeyType={"next"}
          placeholder={"Last Name"}
          autoCapitalize={"words"}
          {...lastNameInput}
        ></AuthInput>
        <AuthInput
          keyboardType={"email-address"}
          placeholder={"Email"}
          returnKeyType={"next"}
          autoCorrect={false}
          {...emailInput}
        />
        <AuthInput
          returnKeyType={"next"}
          placeholder={"Username"}
          autoCorrect={false}
          {...usernameInput}
        ></AuthInput>

        <AuthButton
          text={"Sign Up"}
          onPress={handleSignUp}
          loading={loading}
        ></AuthButton>
        <StyledFBContainer>
          <AuthButton
            bgColor="#2d4da7"
            text={"Connect Facebook"}
            onPress={facebookLogIn}
            loading={false}
          ></AuthButton>
          <AuthButton
            bgColor="#ee1922"
            text={"Connect Google"}
            onPress={googleLogin}
            loading={false}
          ></AuthButton>
        </StyledFBContainer>
      </StyledMainContainer>
    </TouchableWithoutFeedback>
  );
};
