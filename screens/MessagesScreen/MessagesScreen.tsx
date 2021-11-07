import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  KeyboardAvoidingView,
  View,
} from "react-native";
import useInput from "../../hooks/useInput";
import { Message } from "../../typings";
import { MessagesNavigationParamList } from "../../typings/MessagesNavigation";
import {
  GET_MESSAGES,
  NEW_MESSAGE_FROM_WS,
  SEND_MESSAGE,
} from "./MessagesScreen.query";

export const MessagesScreen: React.FC<
  StackScreenProps<MessagesNavigationParamList, "Messages">
> = ({ route }) => {
  const roomId = route?.params?.roomId;

  const { data: defaultMessages } = useQuery<{
    getMessages: Array<Message>;
  }>(GET_MESSAGES, {
    variables: { dialog_id: roomId },
    fetchPolicy: "network-only",
  });

  const [messages, setMessages] = useState<Array<Message>>(
    defaultMessages?.getMessages || []
  );
  // TODO: change userId to correct
  const { data: newMessage } = useSubscription<{ newMessage: Message }>(
    NEW_MESSAGE_FROM_WS,
    { variables: { userId: 123 } }
  );

  const messageInput = useInput("");

  const [sendMessageMutation] = useMutation<{ sendMessage: Message }>(
    SEND_MESSAGE,
    { refetchQueries: [{ query: GET_MESSAGES }] }
  );

  useEffect(() => {
    if (newMessage?.newMessage) {
      setMessages((prev) => [...prev, newMessage?.newMessage]);
    }
  }, [newMessage]);

  const sendMessage = async () => {
    if (messageInput.value === "") return;

    try {
      const response = await sendMessageMutation({
        variables: { roomId, message: messageInput.value },
      });

      if (response.data?.sendMessage?.id) {
        messageInput.onChange("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView>
      <KeyboardAvoidingView enabled behavior="padding">
        {messages?.map((message) => (
          <View key={message.id}>
            <Text>{message.text}</Text>
          </View>
        ))}
        <TextInput
          value={messageInput.value}
          onChangeText={messageInput.onChange}
          returnKeyType={"send"}
          placeholder="Type a message"
          onSubmitEditing={sendMessage}
        ></TextInput>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};
