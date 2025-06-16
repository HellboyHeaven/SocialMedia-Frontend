import { useTheme } from "app/providers/ThemeProvider";
import { useNavigate } from "react-router-dom";
import { CommentType } from "shared/types/comment";
import { PostType } from "shared/types/post";
import Comment, { CommentStyleProps } from "widgets/comment/Comment";
import Post, { PostStyleProps } from "widgets/post/Post";

interface CommentWithPostProps {
  post: PostType;
  comments: CommentType[];
}

export default function CommentWithPost({
  post,
  comments,
}: CommentWithPostProps) {
  const { colors } = useTheme();
  const navigate = useNavigate();

  return (
    <div className="rounded-2xl" style={{ background: colors.primary }}>
      <button
        className="text-md pl-10 pt-10"
        style={{ color: colors.secondary }}
        onClick={() => navigate(`/post/${post.id}`)}
      >
        Open Post
      </button>
      {<Post post={post} style={postStyles} />}
      <div className="pl-6">
        {comments.map((comment) => (
          <Comment comment={comment} style={commentStyles} />
        ))}
      </div>
    </div>
  );
}

const postStyles: PostStyleProps = {
  frameStyle: {
    background: "transparent",
  },
  contentStyle: {
    imageSliderStyle: {
      imageWidth: 400,
      imageHeight: 250,
    },
  },
};

const commentStyles: CommentStyleProps = {
  contentStyle: {
    imageSliderStyle: {
      imageWidth: 40,
      imageHeight: 40,
    },
  },
  frameStyle: {
    background: "transparent",
  },
};
