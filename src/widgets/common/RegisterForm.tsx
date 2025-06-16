import { useTheme } from "app/providers/ThemeProvider";
import { useState } from "react";
import { useAuth } from "app/providers/AuthProvider";
import { AvatarPicker } from "features/common/ui/AvatarPicker";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const { colors } = useTheme();
  const { register } = useAuth();
  const navigate = useNavigate();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const [description, setDescription] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);

  const loginRegex = /^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]*$/;

  const passwordRegex = loginRegex;
  const usernameRegex = /^[A-Za-z0-9]*$/;

  const isFormValid =
    login.trim().length >= 5 &&
    password.trim().length >= 8 &&
    username.trim().length >= 3 &&
    password === repeatPassword &&
    loginRegex.test(login) &&
    passwordRegex.test(password) &&
    usernameRegex.test(username);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!login || !password || !username) {
      alert("Пожалуйста, заполните все обязательные поля");
      return;
    }
    if (password !== repeatPassword) {
      alert("Пароли не совпадают");
      return;
    }
    if (!loginRegex.test(login)) {
      alert(
        "Login может содержать только латинские буквы, цифры и спецсимволы",
      );
      return;
    }
    if (!passwordRegex.test(password)) {
      alert(
        "Пароль может содержать только латинские буквы, цифры и спецсимволы",
      );
      return;
    }
    if (!usernameRegex.test(username)) {
      alert("Username может содержать только латинские буквы и цифры");
      return;
    }
    if (login.length < 5) {
      alert("Login должен быть не менее 5 символов");
      return;
    }
    if (password.length < 8) {
      alert("Пароль должен быть не менее 8 символов");
      return;
    }
    if (username.length < 3) {
      alert("Username должен быть не менее 3 символов");
      return;
    }

    register(login, password, username, nickname, avatar, description)
      .then(() => {
        alert("Регистрация прошла успешно");
      })
      .catch((error) => {
        alert(`Ошибка регистрации: ${error.message}`);
      })
      .finally(() => {
        navigate("/");
      });
  };

  const labelClass = "block mb-4";
  const inputClass = "w-full p-2 rounded mt-1";
  const requiredStar = <span className="text-red-500 ml-1">*</span>;

  return (
    <form
      onSubmit={handleSubmit}
      className="w-2xl p-5 rounded-2xl shadow-lg flex flex-col gap-5"
      style={{ background: colors.primary }}
    >
      <h2 className="text-2xl mb-4" style={{ color: colors.text }}>
        Registration
      </h2>

      <label className={labelClass} style={{ color: colors.text }}>
        Login{requiredStar}
        <input
          type="text"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          required
          className={inputClass}
          style={{ borderColor: colors.tint }}
        />
      </label>

      <label className={labelClass} style={{ color: colors.text }}>
        Password{requiredStar}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={inputClass}
          style={{ borderColor: colors.tint }}
        />
      </label>

      <label className={labelClass} style={{ color: colors.text }}>
        Repeat Password{requiredStar}
        <input
          type="password"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
          required
          className={inputClass}
          style={{ borderColor: colors.tint }}
        />
      </label>

      <AvatarPicker size={80} onChange={(file) => setAvatar(file)} />

      <label className={labelClass} style={{ color: colors.text }}>
        Username{requiredStar}
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className={inputClass}
          style={{ borderColor: colors.tint }}
        />
      </label>

      <label className={labelClass} style={{ color: colors.text }}>
        Nickname
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className={inputClass}
          style={{ borderColor: colors.tint }}
        />
      </label>

      <label className={labelClass} style={{ color: colors.text }}>
        Description
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className={inputClass}
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
        Sign Up
      </button>
    </form>
  );
}
