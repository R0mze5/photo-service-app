import gql from "graphql-tag";
import { POST_FRAGMENT } from "./queriesFragments";

export const CONFIRM_SECRET = gql`
  mutation confirmSecret($secret: String!, $email: String!) {
    confirmSecret(secret: $secret, email: $email)
  }
`;

export const LOG_USER_IN = gql`
  mutation requestSecret($email: String!) {
    requestSecret(email: $email)
  }
`;

export const CREATE_ACCOUNT = gql`
  mutation createAccount(
    $userName: String!
    $email: String!
    $firstName: String
    $lastName: String
    $avatar: String
  ) {
    createAccount(
      userName: $userName
      email: $email
      firstName: $firstName
      lastName: $lastName
      avatar: $avatar
    )
  }
`;

export const GET_MY_FEED = gql`
  query {
    getFeed {
      ...PostParts
    }
  }
  ${POST_FRAGMENT}
`;

export const TOGGLE_LIKE = gql`
  mutation toggleLike($postId: String!) {
    toggleLike(postId: $postId)
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($postId: String!, $text: String!) {
    addComment(postId: $postId, text: $text) {
      id
      text
      user {
        userName
      }
    }
  }
`;

export const SEARCH = gql`
  query search($term: String!) {
    searchPost(term: $term) {
      id
      files {
        id
        url
      }
      likesCount
      commentCount
    }
    searchUser(term: $term) {
      id
      avatar
      userName
      isFollowing
      isSelf
    }
  }
`;

export const GET_POST = gql`
  query postDetails($postId: String!) {
    postDetails(postId: $postId) {
      ...PostParts
    }
  }
  ${POST_FRAGMENT}
`;
