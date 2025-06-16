import { useAuth } from "app/providers/AuthProvider";
import { useTheme } from "app/providers/ThemeProvider";
import { useState } from "react";

export default function LoginForm() {
  const { colors } = useTheme();
  const [loginText, setLoginText] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const isFormValid = loginText.trim() !== "" && password.trim() !== "";
  const requiredStar = <span className="text-red-500 ml-1">*</span>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    login(loginText, password);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-5 rounded-2xl  flex flex-col gap-4"
      style={{ background: colors.background, zIndex: 20 }}
    >
      <label className="block mb-4" style={{ color: colors.text }}>
        Login{requiredStar}
        <input
          type="text"
          value={loginText}
          onChange={(e) => setLoginText(e.target.value)}
          required
          className="w-full p-2 rounded mt-1"
          style={{ borderColor: colors.tint }}
        />
      </label>

      <label className="block mb-6" style={{ color: colors.text }}>
        Password{requiredStar}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 rounded mt-1"
          style={{ borderColor: colors.tint }}
        />
      </label>

      <button
        type="submit"
        disabled={!isFormValid}
        className={`w-full p-3 rounded text-white font-bold ${
          isFormValid ? "" : "opacity-50 cursor-not-allowed"
        }`}
        style={{ backgroundColor: colors.secondary }}
      >
        Sign In
      </button>
      <a
        className="text-lg underline block text-right"
        style={{ color: colors.secondary }}
        href="/register"
      >
        not registered?
      </a>
    </form>
  );
}
