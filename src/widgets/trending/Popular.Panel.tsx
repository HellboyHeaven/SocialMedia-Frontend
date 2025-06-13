import { useTheme } from "app/providers/ThemeProvider";
import PopularCircle from "./Popular.Circle";

export default function PopularPanel() {
  const { colors } = useTheme();

  return (
    <div
      className="grid gap-4 w-sm p-5 bg-white rounded-2xl shadow-lg h-sm fixed"
      style={{ background: colors.primary }}
    >
      <PopularCircle username="" nickname="Elon Musk" followers={10} />
      <PopularCircle username="" nickname="Elon Musk" followers={10000} />
      <PopularCircle username="" nickname="Elon Musk" followers={10} />
      <PopularCircle username="" nickname="Elon Musk" followers={10} />
    </div>
  );
}
