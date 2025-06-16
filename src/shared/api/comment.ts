import api from "shared/api";
export const getCommentById = (id: string) => api.get(`comments/${id}`);

export const getComments = (postId: string, page: number = 1) =>
  api.get("comments", { params: { postId, page } });

export function getUserComments(username: string, page: number) {
  return api.get(`/comments/by-username/${username}`, { params: { page } });
}

export const createComment = (
  postId: string,
  content: string,
  medias: File[],
) => {
  const formData = new FormData();
  formData.append("postId", postId);
  formData.append("content", content);
  medias.forEach((file) => {
    formData.append("medias", file);
  });

  return api.post("comments", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const editComment = (
  id: string,
  content: string,
  oldMedias: string[],
  newMedias: File[],
) => {
  const formData = new FormData();
  formData.append("content", content);

  oldMedias.forEach((url) => {
    formData.append("oldMedias", url);
  });

  newMedias.forEach((file) => {
    formData.append("newMedias", file);
  });

  return api.put(`comments/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteComment = (id: string) => api.delete(`comments/${id}`);
