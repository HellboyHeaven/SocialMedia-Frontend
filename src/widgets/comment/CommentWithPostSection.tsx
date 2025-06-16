import { CommentWithPostIdType } from "shared/types/comment";
import { AnimatePresence } from "framer-motion";
import CommentWithPost from "./CommentWithPost";

type CommentWithPostListProps = {
  comments: CommentWithPostIdType[];
};

export default function CommentWithPostSection({
  comments,
}: CommentWithPostListProps) {
  return (
    <div className="mb-5 flex flex-col items-stretch justify-items-center gap-5">
      <AnimatePresence>
        {comments.map((comment) => (
          <CommentWithPost comment={comment} />
        ))}
      </AnimatePresence>
    </div>
  );
}
