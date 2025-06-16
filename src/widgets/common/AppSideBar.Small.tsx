import { useTheme } from "app/providers/ThemeProvider";
import { UserRound, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AppSideBarSmall() {
  const { colors } = useTheme();
  const navigate = useNavigate();

  return (
    <aside
      className="sticky top-5 flex w-16 min-h-[calc(100vh-40px)] px-2 py-6 flex-col items-center rounded-2xl shadow-md  gap-6"
      style={{ backgroundColor: colors.primary, color: colors.text }}
    >
      {/* Logo/Home */}
      <button onClick={() => navigate("/")} className="hover:opacity-80">
        <Home size={24} />
      </button>

      {/* Profile */}
      <button onClick={() => navigate("/user/me")} className="hover:opacity-80">
        <UserRound size={24} />
      </button>
    </aside>
  );
}
