import { useTheme } from "app/providers/ThemeProvider";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  const { colors } = useTheme();

  return (
    <div className="h-screen flex flex-col justify-center items-center text-center px-4">
      <h1
        className="text-6xl font-bold mb-4"
        style={{ color: colors.secondary }}
      >
        404
      </h1>
      <p className="text-xl mb-6" style={{ color: colors.tint }}>
        Page was Found or Deleted
      </p>
      <Link
        to="/"
        className="px-6 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
      >
        To Main Page
      </Link>
    </div>
  );
}
