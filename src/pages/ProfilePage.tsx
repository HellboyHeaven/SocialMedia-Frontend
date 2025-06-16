import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUser } from "shared/api/profile";
import { UserType } from "shared/types/user";
import { PostType } from "shared/types/post";
import { CommentWithPostType } from "shared/types/comment";
import AppLayout from "widgets/common/AppLayout";
import ProfileCard from "widgets/profile/ProfileCard";
import { getUserPosts } from "shared/api/post";
import PostSection from "widgets/post/PostSection";
import CommentWithPostSection from "widgets/comment/CommentWithPostSection";
import { getUserComments } from "shared/api/comment";

export default function ProfilePage() {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<UserType | null>(null);
  const [activeTab, setActiveTab] = useState<"posts" | "comments">("posts");
  const [posts, setPosts] = useState<PostType[]>([]);
  const [comments, setComments] = useState<CommentWithPostType[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [loadingComments, setLoadingComments] = useState(false);

  // Получаем профиль
  useEffect(() => {
    if (id) {
      getUser(id)
        .then((res) => setUser(res.data))
        .catch((err) => console.error("Failed to fetch user", err));
    }
  }, [id]);

  // Получаем посты пользователя (страница 1)
  useEffect(() => {
    if (user && activeTab === "posts") {
      setLoadingPosts(true);
      getUserPosts(user.username, 1)
        .then((res) => setPosts(res.data))
        .catch((err) => console.error("Failed to fetch posts", err))
        .finally(() => setLoadingPosts(false));
    }
  }, [user, activeTab]);

  // Получаем комментарии пользователя (страница 1)
  useEffect(() => {
    if (user && activeTab === "comments") {
      setLoadingComments(true);
      getUserComments(user.username, 1)
        .then((res) => setComments(res.data))
        .catch((err) => console.error("Failed to fetch comments", err))
        .finally(() => setLoadingComments(false));
    }
  }, [user, activeTab]);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <AppLayout>
      <div className="flex flex-col gap-5">
        <ProfileCard user={user} />

        <div className="border-b border-gray-300 mb-4">
          <nav className="flex space-x-4">
            <button
              className={`py-2 px-4 ${
                activeTab === "posts"
                  ? "border-b-2 border-blue-600 font-semibold"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("posts")}
            >
              Posts
            </button>
            <button
              className={`py-2 px-4 ${
                activeTab === "comments"
                  ? "border-b-2 border-blue-600 font-semibold"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("comments")}
            >
              Comments
            </button>
          </nav>
        </div>

        {activeTab === "posts" && (
          <div>
            {loadingPosts && <p>Loading posts...</p>}
            {!loadingPosts && posts.length === 0 && <p>No posts found.</p>}
            {!loadingPosts && <PostSection posts={posts} />}
          </div>
        )}

        {activeTab === "comments" && (
          <div>
            {loadingComments && <p>Loading comments...</p>}
            {!loadingComments && comments.length === 0 && (
              <p>No comments found.</p>
            )}
            {!loadingComments && <CommentWithPostSection comments={comments} />}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
