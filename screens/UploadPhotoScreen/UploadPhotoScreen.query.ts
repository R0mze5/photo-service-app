import { gql } from "apollo-boost";
import { POST_FRAGMENT } from "../../queriesFragments";

export const CREATE_POST = gql`
  mutation createPost($caption: String, $location: String, $files: [String!]!) {
    createPost(caption: $caption, location: $location, files: $files) {
      ...PostParts
    }
  }
  ${POST_FRAGMENT}
`;
