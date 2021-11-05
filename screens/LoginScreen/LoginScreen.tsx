import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { Alert } from "react-native";
import { AuthButton } from "../../components/AuthButton";
import { AuthInput } from "../../components/AuthInput";
import { StyledMainContainer } from "../../components/StyledMainContainer";
import useInput from "../../hooks/useInput";
import { AuthStackParamList } from "../../typings/AuthStack";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import { useMutation } from "@apollo/client";
import { LOG_USER_IN } from "../../queries";
import { emailRegExp } from "../../variables";

export const LoginScreen: React.FC<
  StackScreenProps<AuthStackParamList, "Login">
> = ({ navigation }) => {
  const emailInput = useInput("");

  const [requestSecretMutation, { loading }] = useMutation<{
    requestSecret: boolean;
  }>(LOG_USER_IN);

  const handleLogin = async () => {
    const { value } = emailInput;
    if (value === "") {
      Alert.alert("Email can't be empty");
    } else if (!emailRegExp.test(value)) {
      Alert.alert("Email is not valid");
    } else {
      try {
        const { data } = await requestSecretMutation({
          variables: { email: value },
        });
        if (data?.requestSecret) {
          navigation.navigate("Confirm", { email: value });
        } else {
          Alert.alert("Account not found");
          navigation.navigate("SignUp", { email: value });
        }
      } catch (error) {
        console.log(error);
        Alert.alert("Can't request secret, try again");
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <StyledMainContainer>
        <AuthInput
          keyboardType={"email-address"}
          placeholder={"Email"}
          returnKeyType={"send"}
          onSubmitEditing={handleLogin}
          autoCorrect={false}
          {...emailInput}
        />
        <AuthButton
          text={"Login"}
          onPress={handleLogin}
          loading={loading}
        ></AuthButton>
      </StyledMainContainer>
    </TouchableWithoutFeedback>
  );
};
