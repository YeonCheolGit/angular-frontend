import { User } from '../myinfo/User';
import { Reply } from '../reply/Reply';

export interface Post {
  postNo: number;
  userNo: number;
  title: string;
  author: string;
  content: string;
  createdAt: Date;
  modifiedAt: Date;
  user: User;
  replyByPostNo: Array<Reply>;
}
