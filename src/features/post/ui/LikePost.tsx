import Like from "features/content/ui/Like";
import { likePost, unlikePost } from "shared/api/like";

type LikePostProps = {
  targetId: string;
  count: number;
  liked: boolean;
};

export default function LikePost({ targetId, count, liked }: LikePostProps) {
  return (
    <Like
      targetId={targetId}
      count={count}
      liked={liked}
      likeFetch={likePost}
      unlikeFetch={unlikePost}
    />
  );
}
