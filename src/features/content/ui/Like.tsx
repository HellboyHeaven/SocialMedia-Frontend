import { useAuth } from "app/providers/AuthProvider";
import { useTheme } from "app/providers/ThemeProvider";
import { AxiosResponse } from "axios";
import { Heart } from "lucide-react";
import { useState } from "react";

interface LikeProps {
  targetId: string;
  count: number;
  liked: boolean;
  likeFetch: (targetId: string) => Promise<AxiosResponse<unknown, unknown>>;
  unlikeFetch: (targetId: string) => Promise<AxiosResponse<unknown, unknown>>;
  onLikeChange?: (liked: boolean, count: number) => void;
}

export default function Like({
  targetId,
  count,
  liked,
  likeFetch,
  unlikeFetch,
  onLikeChange,
}: LikeProps) {
  const { colors } = useTheme();
  const [isLiked, setIsLiked] = useState<boolean>(liked);
  const [likeCount, setLikeCount] = useState<number>(count);
  const [hover, setHover] = useState(false);
  const { user } = useAuth();
  const toggleLike = () => {
    const newLiked = !isLiked;
    const newCount = newLiked ? likeCount + 1 : likeCount - 1;
    if (user == null) return;
    setIsLiked(newLiked);
    setLikeCount(newCount);

    if (newLiked) {
      likeFetch(targetId).catch((e) => console.error("Like error:", e));
    } else {
      unlikeFetch(targetId).catch((e) => console.error("Unlike error:", e));
    }

    onLikeChange?.(newLiked, newCount);
  };

  // Цвета
  const color = hover ? "#dc2626" : isLiked ? "#dc2626" : colors.tint;

  return (
    <button
      onClick={toggleLike}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="flex items-center gap-2"
      style={{ color }}
    >
      <Heart size={20} fill={isLiked ? "red" : "none"} />
      {likeCount !== 0 && <span>{likeCount}</span>}
    </button>
  );
}
