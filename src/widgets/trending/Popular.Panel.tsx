import { useTheme } from "app/providers/ThemeProvider";
import PopularCircle from "./Popular.Circle";

export default function PopularPanel() {
  const { colors } = useTheme();

  return (
    <div
      className="grow grid max-w-sm gap-4 p-5 bg-white rounded-2xl shadow-lg sticky top-5"
      style={{ background: colors.primary }}
    >
      <PopularCircle username="" nickname="Elon Musk" followers={10} />
      <PopularCircle username="" nickname="Elon Musk" followers={10000} />
      <PopularCircle username="" nickname="Elon Musk" followers={10} />
      <PopularCircle username="" nickname="Elon Musk" followers={10} />
    </div>
  );
}
