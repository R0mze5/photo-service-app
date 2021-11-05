import { Post } from "./Post";
import { Comment } from "./Comment";
import { BaseInterface } from "./Base";

export type UserId = string;
export type UserName = string;
export type UserIsFollowing = boolean;
export type UserAvatar = string | null;
export type UserIsSelf = boolean;

export interface User extends BaseInterface {
  id: UserId;
  avatar?: UserAvatar;
  userName: UserName;
  email: string;
  firstName?: string;
  lastName?: string;
  fullName: string;
  bio?: string;
  posts: Array<Post>;
  postsCount: number;
  likes: Array<any>;
  comments: Array<Comment>;
  following: Array<User>;
  followingCount: number;
  followers: Array<User>;
  followersCount: number;
  rooms: Array<Comment>;
  loginSecret: string;
  isFollowing: UserIsFollowing;
  isSelf: UserIsSelf;
}

export interface UserSearch {
  id: UserId;
  avatar: UserAvatar;
  userName: string;
  isFollowing: boolean;
  isSelf: UserIsSelf;
}
