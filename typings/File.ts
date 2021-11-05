import { BaseInterface } from "./Base";
import { Post } from "./Post";

export type FileId = string;
export type FileUrl = string;

export interface File extends BaseInterface {
  id: FileId;
  url: FileUrl;
  post: Post;
}

export interface FileSearch {
  id: FileId;
  url: FileUrl;
}
