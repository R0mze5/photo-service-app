import { BaseInterface } from './Base';
import { Post } from './Post';
import { User } from './User';

export type CommentId = string

export interface Comment extends BaseInterface {
  id: CommentId
  text: string
  user: User
  post: Post
}
