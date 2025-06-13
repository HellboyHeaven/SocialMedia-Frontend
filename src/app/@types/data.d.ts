interface Post {
  id: string;
  sender: string;
  content: string;
  image?: string;
  time: string;
  likes: number;
  comments: number;
}

interface User {
  id: string;
  username: string;
  nickname: string;
  avatar: string;
}
