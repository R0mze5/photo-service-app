import { BaseInterface } from './Base';
import { User } from './User';

export type RoomId = string

export interface Room extends BaseInterface {
  id: RoomId
  participants: Array<User>
}
