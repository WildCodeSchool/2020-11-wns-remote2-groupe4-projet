import { User } from './userInterface';

export type Message = {
  id: string;
  content: string;
  sentAt: Date;
  author: User;
};
