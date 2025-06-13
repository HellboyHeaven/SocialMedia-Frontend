import PostList from "widgets/post/PostList";
import PopularPanel from "widgets/trending/Popular.Panel";

export default function Feed() {
  return (
    <div className="mt-4 gap-4 flex">
      <div className="flex-1"></div>
      <div className="flex-1">
        <PostList />
      </div>
      <div className="flex-1">
        <PopularPanel />
      </div>
    </div>
  );
}

// <div>
//   <Post
//     avatar="https://pikuco.ru/upload/test_stable/fa9/fa9d73a8bbd0507d0bb61ca90cf68ce5.webp"
//     username="@skubbi"
//     nickname="skubbi"
//     time="3m"
//     content="Content Here"
//   />
// </div>
