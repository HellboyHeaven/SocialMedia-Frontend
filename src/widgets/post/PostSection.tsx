// PostSection.tsx - упрощенная версия
import { motion, AnimatePresence } from "framer-motion";
import Post from "widgets/post/Post";
import { PostType } from "shared/types/post";

type PostListProps = {
  posts: PostType[];
};

export default function PostSection({ posts }: PostListProps) {
  console.log("PostSection received posts:", posts);

  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Нет постов для отображения
      </div>
    );
  }

  return (
    <div className="grid justify-items-center gap-5">
      <AnimatePresence mode="wait">
        {posts.map((post, index) => {
          console.log(`Rendering post ${index}:`, post);
          return (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <Post post={post} />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
