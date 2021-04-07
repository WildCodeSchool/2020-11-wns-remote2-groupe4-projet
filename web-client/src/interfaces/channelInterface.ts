import { Message } from './messageInterface';
import { User } from './userInterface';

export type Channel = {
  id: string;
  title: string;
  messages: Message[];
  users: User[];
};
