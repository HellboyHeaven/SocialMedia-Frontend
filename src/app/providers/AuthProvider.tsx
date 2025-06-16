import {
  createContext,
  useContext,
  useEffect,
  useState,
  PropsWithChildren,
} from "react";
import {
  register as registerRequest,
  login as loginRequest,
  revokeRefreshToken as logoutRequest,
  refreshToken,
} from "shared/api/auth";
import { createProfile, getMe } from "shared/api/profile";
import { UserBriefType } from "shared/types/user";

type AuthContextType = {
  user: UserBriefType | null;
  register: (
    login: string,
    password: string,
    username: string,
    nickname: string,
    avatar: File | null,
    description: string,
  ) => Promise<void>;
  login: (login: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<UserBriefType | null>(null);
  const checkAuth = async () => {
    try {
      const res = await getMe();
      setUser(res.data);
    } catch {
      try {
        await refreshToken();
        const res = await getMe();
        setUser(res.data);
      } catch {
        setUser(null);
      }
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const register = async (
    login: string,
    password: string,
    username: string,
    nickname: string,
    avatar: File | null,
    description: string,
  ) => {
    await registerRequest({ login, password });
    await loginRequest({ login, password });
    await createProfile(username, nickname, description, avatar);
    window.location.reload();
  };

  const login = async (login: string, password: string) => {
    await loginRequest({ login, password });
    await checkAuth();
    window.location.reload();
  };

  const logout = async () => {
    await logoutRequest();
    setUser(null);
    window.location.reload();
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
