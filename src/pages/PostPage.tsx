import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostById } from "shared/api/post";
import { getComments } from "shared/api/comment";
import { PostType } from "shared/types/post";
import CommentSection from "widgets/comment/CommentSection";
import Post from "widgets/post/Post";
import CreateCommentSection from "widgets/comment/CreateCommentSection";
import { CommentType } from "shared/types/comment";
import AppLayout from "widgets/common/AppLayout";

export default function PostPage() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<PostType | null>(null);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (id) {
      getPostById(id)
        .then((res) => setPost(res.data))
        .catch(console.error);
    }
  }, [id]);

  const fetchComments = useCallback(
    async (pageNum: number) => {
      if (!id) return;
      setLoading(true);
      try {
        const res = await getComments(id, pageNum); // Ensure `getComments(postId, page)` is supported
        const data = res.data as CommentType[];

        if (data.length === 0) {
          setHasMore(false);
        } else {
          setComments((prev) => {
            const existingIds = new Set(prev.map((c) => c.id));
            const newComments = data.filter((c) => !existingIds.has(c.id));
            return [...prev, ...newComments];
          });
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    },
    [id],
  );

  useEffect(() => {
    fetchComments(page);
  }, [page, fetchComments]);

  useEffect(() => {
    function onScroll() {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 300 &&
        !loading &&
        hasMore
      ) {
        setPage((p) => p + 1);
      }
    }

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [loading, hasMore]);

  const addComment = (comment: CommentType) => {
    setComments((prev) =>
      prev.some((c) => c.id === comment.id) ? prev : [...prev, comment],
    );
  };

  if (!post) return <p>Загрузка...</p>;

  return (
    <AppLayout>
      <div className="flex-1 flex flex-col items-stretch justify-center gap-5">
        <Post post={post} />
        <CreateCommentSection onCommentCreated={addComment} postId={id!} />
        <CommentSection comments={comments} />
      </div>
    </AppLayout>
  );
}
