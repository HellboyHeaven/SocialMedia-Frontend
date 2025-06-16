import { useState } from "react";
import { useAuth } from "app/providers/AuthProvider";
import { useTheme } from "app/providers/ThemeProvider";
import LoginForm from "./LoginForm";
import { UserRound, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AppSideBar() {
  const { user, logout } = useAuth();
  const { colors } = useTheme();
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      {/* Боковая панель */}
      <aside
        className="sticky top-5 flex grow max-h-[calc(100vh-40px)] max-w-sm px-10 py-10 flex-col rounded-2xl  justify-between shadow-md  "
        style={{ backgroundColor: colors.primary, color: colors.text }}
      >
        {/* Верхняя часть */}
        <div className="flex flex-col">
          <a href="/" className="text-2xl font-bold block mb-8">
            MyApp
          </a>

          {user ? (
            <button
              className=" flex items-center gap-5"
              onClick={() => navigate(`/user/${user.username}`)}
            >
              <UserRound size={40} />
              <p className="text-xl">Profile</p>
            </button>
          ) : (
            <button
              className="mt-2 px-4 py-2 text-white min-w-32 rounded hover:bg-gray-100"
              style={{
                backgroundColor: colors.secondary,
              }}
              onClick={() => setShowLogin(true)}
            >
              Sign In
            </button>
          )}
        </div>

        {/* Нижняя часть */}
        <div className="flex flex-col gap-2 text-sm opacity-80">
          {user && (
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              Log Out
            </button>
          )}
        </div>
      </aside>
      {/* Панель входа (выезжающая справа) */}
      <div
        className={`fixed top-0 right-0 h-full w-80 shadow-lg transition-transform duration-300 z-[1000] ${
          showLogin ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          backgroundColor: colors.background ?? "#242424",
          color: colors.text,
        }}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Sign In</h2>
          <button onClick={() => setShowLogin(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4">
          <LoginForm />
        </div>
      </div>

      {/* Затемнение */}
      {showLogin && (
        <div
          className="fixed inset-0 bg-black/50 z-[999]"
          onClick={() => setShowLogin(false)}
        />
      )}
    </>
  );
}
