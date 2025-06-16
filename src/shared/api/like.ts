import api from ".";

export const likePost = (postId: string) => api.post(`likes/posts/${postId}`);

export const unlikePost = (postId: string) =>
  api.delete(`likes/posts/${postId}`);

export const likeComment = (commentId: string) =>
  api.post(`likes/comments/${commentId}`);

export const unlikeComment = (commentId: string) =>
  api.delete(`likes/comments/${commentId}`);
