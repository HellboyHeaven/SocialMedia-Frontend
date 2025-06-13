import { useTheme } from "app/providers/ThemeProvider";
import { Share } from "lucide-react";

export default function SharePost() {
  const { colors } = useTheme();

  return (
    <button
      className={`flex items-center gap-2 hover:text-green-500 text-[${colors.tint}]`}
    >
      <Share size={20} />
    </button>
  );
}
