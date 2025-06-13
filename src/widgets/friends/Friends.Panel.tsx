import { useTheme } from "app/providers/ThemeProvider";
import FriendCircle from "./Friend.Circle";

export default function FriendPanel() {
  const { colors } = useTheme();

  return (
    <div
      className="grid grid-cols-3 grid-rows-2 gap-4 w-sm p-5 bg-white rounded-2xl shadow-lg h-sm"
      style={{ background: colors.primary }}
    >
      <FriendCircle />
      <FriendCircle />
      <FriendCircle />
      <FriendCircle />
      <FriendCircle />
      <FriendCircle />
    </div>
  );
}
