import { CommentWithPostType } from "shared/types/comment";
import { AnimatePresence } from "framer-motion";
import CommentWithPost from "./CommentWithPost";
import { groupCommentsByPost } from "shared/lib/groupCommentsByPost";

type CommentWithPostListProps = {
  comments: CommentWithPostType[];
};

export default function CommentWithPostSection({
  comments,
}: CommentWithPostListProps) {
  const grouped = groupCommentsByPost(comments);

  return (
    <div className="mb-5 flex flex-col items-stretch justify-items-center gap-5">
      <AnimatePresence>
        {grouped.map(({ post, comments }) => (
          <CommentWithPost post={post} comments={comments} />
        ))}
      </AnimatePresence>
    </div>
  );
}
