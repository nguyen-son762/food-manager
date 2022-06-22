import { UserDef } from '@app/features/auth/auth';
import { MessageDef } from '@app/types/atom.type';

export interface RoomsResponseDef {
  createdAt: string;
  status?: number;
  users: UserDef[];
  _id: string;
  messages: MessageResponseDef[];
}
export interface MessageResponseDef {
  message: MessageDef;
  _id: string;
}
