import { useTheme } from "app/providers/ThemeProvider";
import { MessageCircle } from "lucide-react";

interface CommentProps {
  count: number;
}

export default function CommentPost({ count }: CommentProps) {
  const { colors } = useTheme();

  return (
    <button
      className={`flex items-center gap-2 hover:text-blue-500 text-[${colors.tint}]`}
    >
      <MessageCircle size={20} />
      {count != 0 && <span>{count}</span>}
    </button>
  );
}
