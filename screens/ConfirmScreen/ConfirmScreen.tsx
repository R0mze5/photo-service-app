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
import { useAuthorization } from "../../context/AuthContext";
import { CONFIRM_SECRET } from "../../queries";

export const ConfirmScreen: React.FC<
  StackScreenProps<AuthStackParamList, "Confirm">
> = ({ route }) => {
  const confirmInput = useInput("");

  const { params } = route;

  const { logUserIn } = useAuthorization();

  const [confirmSecretMutation, { loading }] = useMutation<{
    confirmSecret: boolean;
  }>(CONFIRM_SECRET);

  const handleConfirmSecret = async () => {
    const { value } = confirmInput;
    if (value === "") {
      Alert.alert("Secret can't be empty");
    } else {
      try {
        const { data } = await confirmSecretMutation({
          variables: { secret: confirmInput.value, email: params.email },
        });

        if (
          typeof data?.confirmSecret === "string" &&
          data?.confirmSecret !== ""
        ) {
          logUserIn(data.confirmSecret);
        } else {
          Alert.alert("Wrong secret, try again");
        }
      } catch (error) {
        Alert.alert("Can't confirm secret, try again");
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <StyledMainContainer>
        <AuthInput
          placeholder={"Secret"}
          returnKeyType={"send"}
          onSubmitEditing={handleConfirmSecret}
          autoCorrect={false}
          {...confirmInput}
        />
        <AuthButton
          text={"Confirm Secret"}
          onPress={handleConfirmSecret}
          loading={loading}
        ></AuthButton>
      </StyledMainContainer>
    </TouchableWithoutFeedback>
  );
};
