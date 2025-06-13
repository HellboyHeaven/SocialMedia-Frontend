import api from "shared/api";
export const getProfileById = (id: string) => api.get(`profile/${id}`);
