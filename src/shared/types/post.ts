import { CommentType } from "./comment";
import { UserBriefType } from "./user";

export type PostType = {
  id: string;
  author: UserBriefType | undefined;
  content: string;
  medias: string[];
  createdAt: string;
  likes: number;
  liked: boolean;
  comments: number;
};

export type PostWithComments = {
  post: PostType;
  comments: CommentType[];
};
