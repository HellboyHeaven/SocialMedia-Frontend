import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "shared/slices/postSlice";
import { AppDispatch, RootState } from "shared/stores/store";
import Post from "widgets/post/Post";

export default function PostList() {
  const posts = useSelector((state: RootState) =>
    Object.values(state.posts.posts.entities),
  );
  const senders = useSelector((state: RootState) => state.posts.users.entities);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (posts && posts.length != 0) {
    console.log(posts);
  }

  return (
    <div className="grid justify-items-center gap-5">
      <h2>Посты</h2>
      {posts.map((post: Post) => (
        <Post
          key={post.id}
          avatar={senders[post.sender].avatar}
          username={senders[post.sender].username}
          nickname={senders[post.sender].nickname}
          image={post.image}
          time={post.time}
          content={post.content}
          likes={post.likes}
          comments={post.comments}
        />
      ))}
    </div>
  );
}
