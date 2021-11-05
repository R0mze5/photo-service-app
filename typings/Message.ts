import { BaseInterface } from './Base';
import { Room } from './Room';
import { User } from './User';

export type MessageId = string

export interface Message extends BaseInterface {
  id: MessageId
  text: string
  sender: User
  recipient: User
  room: Room
}
