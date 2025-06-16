import Like from "features/content/ui/Like";
import { likeComment, unlikeComment } from "shared/api/like";

type LikeCommentProps = {
  targetId: string;
  count: number;
  liked: boolean;
};

export function LikeComment({ targetId, count, liked }: LikeCommentProps) {
  return (
    <Like
      targetId={targetId}
      count={count}
      liked={liked}
      likeFetch={likeComment}
      unlikeFetch={unlikeComment}
    />
  );
}
