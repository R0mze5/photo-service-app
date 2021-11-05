import { Comment } from "./Comment";
import { User } from "./User";
import { File, FileSearch } from "./File";
import { BaseInterface } from "./Base";

export type PostId = string;
export type PostLikesCount = number;
export type PostCommentCount = number;

export interface Post extends BaseInterface {
  id: PostId;
  files: Array<File>;
  location?: string | null;
  caption: string;
  user: User;
  likes: Array<any>;
  comments: Array<Comment>;
  isLiked: boolean;
  likesCount: PostLikesCount;
  commentCount: PostCommentCount;
  createdAt: string;
}

export interface PostCreate {
  files: Array<string>;
  location?: string;
  caption?: string;
  // user: User
}

export interface PostSearch {
  id: PostId;
  files: Array<FileSearch>;
  likesCount: number;
  commentCount: number;
}
