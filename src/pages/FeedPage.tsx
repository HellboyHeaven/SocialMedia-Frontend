import { useCallback, useEffect, useState, useMemo } from "react";
import PostSection from "widgets/post/PostSection";
import { getPosts } from "shared/api/post";
import { PostType } from "shared/types/post";
import CreatePostSection from "widgets/post/CreatePostSection";
import AppLayout from "widgets/common/AppLayout";

export default function FeedPage() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = useCallback(async (pageNum: number) => {
    setLoading(true);
    try {
      const res = await getPosts(pageNum);
      const data = (await res.data) as PostType[];

      if (data.length === 0) {
        setHasMore(false);
      } else {
        setPosts((prev) => {
          const existingIds = new Set(prev.map((p) => p.id));
          const newPosts = data.filter((p: PostType) => !existingIds.has(p.id));
          return [...prev, ...newPosts];
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts(page);
  }, [page, fetchPosts]);

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

  // Мемоизируем функцию addPost чтобы избежать лишних ререндеров
  const addPost = useCallback((post: PostType) => {
    setPosts((prev) => {
      const exists = prev.some((p) => p.id === post.id);
      if (exists) {
        return prev;
      }
      return [post, ...prev];
    });
  }, []);

  // Мемоизируем posts для оптимизации
  const memoizedPosts = useMemo(() => posts, [posts]);

  return (
    <AppLayout>
      <div className="flex items-stretch flex-col gap-5">
        <CreatePostSection onPostCreated={addPost} />
        <PostSection posts={memoizedPosts} />
      </div>
    </AppLayout>
  );
}
