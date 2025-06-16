import { createPost } from "shared/api/post";
import { useState } from "react";
import { PostType } from "shared/types/post";
import { LoaderCircle, SendHorizonal } from "lucide-react";
import { motion } from "framer-motion";

type PublishPostProps = {
  medias: File[];
  content: string;
  onSuccess?: (newPost: PostType) => void;
};

export default function PublishPost({
  medias,
  content,
  onSuccess,
}: PublishPostProps) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim()) return;
    setLoading(true);
    try {
      const res = await createPost(content, medias);
      onSuccess?.(res.data); // передаём созданный пост
    } catch (err) {
      console.error("Ошибка при публикации:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleSubmit}
      disabled={loading}
      className="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
    >
      {loading ? <Loading /> : <SendHorizonal size={20} />}
    </button>
  );
}

function Loading() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
    >
      <LoaderCircle size={20} />
    </motion.div>
  );
}
