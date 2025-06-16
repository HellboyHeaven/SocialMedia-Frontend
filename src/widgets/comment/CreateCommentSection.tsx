import { useAuth } from "app/providers/AuthProvider";
import { createComment } from "shared/api/comment";
import { CommentType } from "shared/types/comment";
import CreateContentSection from "widgets/common/CreateContentSection";

type Props = {
  onCommentCreated: (post: CommentType) => void;
  postId: string;
};

export default function CreateCommentSection({
  onCommentCreated,
  postId,
}: Props) {
  const { user } = useAuth();

  return (
    <CreateContentSection<CommentType>
      show={user !== null}
      placeholderText="New comment"
      onContentCreated={onCommentCreated}
      createFetch={(content, medias) => createComment(postId, content, medias)}
    />
  );
}
