import api from "shared/api";
export const getPostById = (id: string) => api.get(`posts/${id}`);

export const getPosts = (page: number = 1) =>
  api.get("posts", { params: { page } });

export const createPost = (content: string, medias: File[]) => {
  const formData = new FormData();
  formData.append("content", content);
  medias.forEach((file) => {
    formData.append("medias", file);
  });

  return api.post("posts", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export function getUserPosts(username: string, page: number) {
  return api.get(`/posts/by-username/${username}`, { params: { page } });
}

export const editPost = (
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

  return api.put(`posts/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deletePost = (id: string) => {
  api.delete(`posts/${id}`);
};
