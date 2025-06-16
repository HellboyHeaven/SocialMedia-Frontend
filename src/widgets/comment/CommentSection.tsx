import { useState, useEffect } from "react";
import { CommentType } from "shared/types/comment";
import Comment from "./Comment";
import { AnimatePresence, motion } from "framer-motion";

type CommentSectionProps = {
  comments: CommentType[];
  onDeleteComment?: (id: string) => void;
};

export default function CommentSection({ comments }: CommentSectionProps) {
  // Синхронизируем локальное состояние с пропсами
  const [localComments, setLocalComments] = useState<CommentType[]>(comments);

  // Обновляем локальное состояние когда изменяются пропсы
  useEffect(() => {
    setLocalComments(comments);
  }, [comments]);

  console.log("CommentSection received comments:", comments);
  console.log("CommentSection local comments:", localComments);

  if (!localComments || localComments.length === 0) {
    return (
      <div className="mb-5 text-center py-4 text-gray-500">
        Нет комментариев
      </div>
    );
  }

  return (
    <div className="mb-5 flex flex-col items-stretch justify-items-center gap-5">
      <AnimatePresence mode="wait">
        {localComments.map((comment) => (
          <motion.div
            key={comment.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <Comment comment={comment} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
