import { UserBriefType } from "./user";

export type CommentType = {
  id: string;
  author: UserBriefType | undefined;
  content: string;
  medias: string[];
  createdAt: string;
  likes: number;
  liked: boolean;
};

export type CommentWithPostIdType = CommentType & {
  postId: string;
};
