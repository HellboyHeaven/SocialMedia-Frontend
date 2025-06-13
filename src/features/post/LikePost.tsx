import { useTheme } from "app/providers/ThemeProvider";
import { Heart } from "lucide-react";

interface LikeProps {
  count: number;
}

export default function LikePost({ count }: LikeProps) {
  const { colors } = useTheme();

  return (
    <button
      className={`flex items-center gap-2 hover:text-red-500 text-[${colors.tint}]`}
    >
      <Heart size={20} />
      {count != 0 && <span>{count}</span>}
    </button>
  );
}
