import { useTheme } from "app/providers/ThemeProvider";
import CommentPost from "features/post/CommentPost";
import LikePost from "features/post/LikePost";
import SharePost from "features/post/SharePost";

interface PostProps {
  nickname: string;
  username: string;
  avatar: string;
  content: string;
  image?: string; // Optional image field
  time: string;
  likes: number;
  comments: number;
}

export default function Post({
  nickname,
  username,
  avatar,
  content,
  image,
  time,
  likes,
  comments,
}: PostProps) {
  const { colors } = useTheme();
  console.log(image);
  return (
    <div
      className="w-2xl p-5 bg-white rounded-2xl shadow-lg"
      style={{ background: colors.primary }}
    >
      {/* Header */}
      <div className="flex items-center gap-4">
        <img
          src={avatar}
          alt="avatar"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold text-lg" style={{ color: colors.text }}>
            {nickname}
          </p>
          <p className="text-sm text-gray-500" style={{ color: colors.tint }}>
            @{username} • {time}
          </p>
        </div>
      </div>

      {/* Content */}
      <p
        className="mt-3 text-base text-gray-800 whitespace-pre-wrap"
        style={{ color: colors.text }}
      >
        {content}
      </p>

      {/* Image (if available) */}
      {image && (
        <img
          src={image}
          alt="post"
          className="mt-4 w-full rounded-lg shadow-sm"
        />
      )}

      {/* Actions */}
      <div className="flex justify-between mt-5 mx-7 text-sm text-gray-500">
        <LikePost count={likes} />
        <CommentPost count={comments} />
        <SharePost />
      </div>
    </div>
  );
}
