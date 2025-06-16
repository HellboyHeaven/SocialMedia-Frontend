import api, {
  clearTokens,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from "./index";

type LoginRequest = {
  login: string;
  password: string;
};

export async function login(request: LoginRequest) {
  const response = await api.post("/auth/login", request);
  const data = response.data;
  setAccessToken(data.accessToken);
  setRefreshToken(data.refreshToken);
}

export const register = (data: LoginRequest) =>
  api.post("/auth/register", data);

export const authCheck = () => api.get("/auth/auth-check");

export async function refreshToken() {
  const response = await api.post("/auth/refresh-token", {
    refreshToken: getRefreshToken(),
  });
  const data = response.data;
  setAccessToken(data.accessToken);
  setRefreshToken(data.refreshToken);
}

export async function revokeRefreshToken() {
  await api.post("/auth/revoke-refreshtoken");
  clearTokens();
}
