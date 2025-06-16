import { useTheme } from "app/providers/ThemeProvider";
import { MessageCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface CommentProps {
  postId: string;
  count: number;
}

export default function CommentPost({ postId, count }: CommentProps) {
  const { colors } = useTheme();
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();

  return (
    <button
      className="flex items-center gap-2"
      style={{ color: hover ? "#60a5fa" : colors.tint }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => navigate(`/post/${postId}`)}
    >
      <MessageCircle size={20} />
      {count != 0 && <span>{count}</span>}
    </button>
  );
}
//
