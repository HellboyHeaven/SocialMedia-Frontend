import api from "shared/api";
export const getPostById = (id: string) => api.get(`posts/${id}`);
