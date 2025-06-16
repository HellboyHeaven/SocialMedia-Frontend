import { useTheme } from "app/providers/ThemeProvider";
import { useNavigate } from "react-router-dom";
import { CommentWithPostIdType } from "shared/types/comment";
import Comment, { CommentStyleProps } from "widgets/comment/Comment";

interface CommentWithPostProps {
  comment: CommentWithPostIdType;
}

export default function CommentWithPost({ comment }: CommentWithPostProps) {
  const { colors } = useTheme();
  const navigate = useNavigate();

  return (
    <div className="rounded-2xl" style={{ background: colors.primary }}>
      <button
        className="text-md pl-10 pt-10"
        style={{ color: colors.secondary }}
        onClick={() => navigate(`/post/${comment.postId}`)}
      >
        Open Post
      </button>
      <div className="pl-6">
        <Comment comment={comment} style={commentStyles} />
      </div>
    </div>
  );
}

// const postStyles: PostStyleProps = {
//   frameStyle: {
//     background: "transparent",
//   },
//   contentStyle: {
//     imageSliderStyle: {
//       imageWidth: 400,
//       imageHeight: 250,
//     },
//   },
// };

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
