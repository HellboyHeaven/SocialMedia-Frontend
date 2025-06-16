import api from "shared/api";
export const getMe = () => api.get("profiles/me");
export const getUser = (username: string) => api.get(`profiles/${username}`);
export const createProfile = (
  username: string,
  nickname: string,
  description: string,
  avatar: File | null,
) => {
  const formData = new FormData();
  formData.append("username", username);
  formData.append("nickname", nickname);
  formData.append("description", description);
  if (avatar) formData.append("avatar", avatar);

  return api.post("profiles", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
