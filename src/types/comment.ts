import {User} from './user';

export type Comment = {
  offerId?: string;
  id: string;
  date: string;
  user: User;
  comment: string;
  rating: number;
};
