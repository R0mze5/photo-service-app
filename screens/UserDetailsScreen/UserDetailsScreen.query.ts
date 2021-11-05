import { gql } from "@apollo/client";
import { USER_FRAGMENT } from "../../queriesFragments";

export const USER_DETAILS = gql`
  query userDetails($username: String!) {
    userDetails(username: $username) {
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`;
