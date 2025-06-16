export type UserBriefType = {
  username: string;
  nickname: string;
  avatar: string;
  isAdmin: boolean;
};

export type UserType = UserBriefType & {
  description: string;
};
