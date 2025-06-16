export type UserBriefType = {
  username: string;
  nickname: string;
  avatar: string;
};

export type UserType = UserBriefType & {
  description: string;
};
