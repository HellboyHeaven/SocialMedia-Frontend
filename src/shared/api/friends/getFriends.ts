import api from "shared/api";
export const getUsers = () => api.get("friends");
