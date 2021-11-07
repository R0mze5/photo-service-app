import { gql } from "apollo-boost";

export const GET_MESSAGES = gql`
  query getMessages($roomId: String!) {
    getMessages(roomId: $roomId) {
      id
      text
      sender
      recipient
      room
      createdAt
      updatedAt
    }
  }
`;

export const SEND_MESSAGE = gql`
  query sendMessage($roomId: String!, $message: String!) {
    sendMessage(roomId: $roomId, message: $message) {
      id
      text
      sender
      recipient
      room
      createdAt
      updatedAt
    }
  }
`;

export const NEW_MESSAGE_FROM_WS = gql`
  query newMessage($userId: String!) {
    newMessage(userId: $userId) {
      id
      text
      sender
      recipient
      room
      createdAt
      updatedAt
    }
  }
`;
