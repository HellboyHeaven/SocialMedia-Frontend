import { useState } from "react";
import ContentCardFrame, {
  ContentCardFrameStyle,
} from "features/content/ui/ContentCardFrame";
import UserHeader from "features/common/ui/UserHeader";
import ActionMenu from "features/content/ui/ActionMenu";
import Content, { ContentStyleProps } from "widgets/common/Content";
import { LikeComment } from "features/comment/LikeComment";
import useCommentEdit from "features/comment/ui/useCommentEdit";
import { useAuth } from "app/providers/AuthProvider";
import { CommentType } from "shared/types/comment";
import { deleteComment } from "shared/api/comment";

export interface CommentStyleProps {
  contentStyle?: ContentStyleProps;
  frameStyle?: ContentCardFrameStyle;
}

interface Props {
  comment: CommentType;
  style?: CommentStyleProps;
}

export default function Comment({ comment, style }: Props) {
  const { user } = useAuth();
  const { editContent } = useCommentEdit();
  const [editing, setEditing] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const handleEdit = () => setEditing(true);
  const handleCancelEdit = () => setEditing(false);
  const handleFinishEdit = () => setEditing(false);
  if (deleted) return <></>;

  return (
    <ContentCardFrame style={style?.frameStyle}>
      <div className="ml-2 mb-5 flex justify-between">
        <UserHeader user={comment.author} time={comment.createdAt} />
        {user?.username == comment.author?.username && (
          <ActionMenu
            onEdit={handleEdit}
            onDelete={async () => {
              try {
                await deleteComment(comment.id);
                setDeleted(true);
              } catch (e) {
                console.error("Failed to delete comment", e);
              }
            }}
          />
        )}
      </div>

      <Content
        id={comment.id}
        initialContent={comment.content}
        initialMedias={comment.medias}
        editContent={editContent}
        editing={editing}
        setEditing={setEditing}
        onCancelEdit={handleCancelEdit}
        onFinishEdit={handleFinishEdit}
      />

      <div className="flex justify-between mt-5 mx-7">
        <LikeComment
          targetId={comment.id}
          liked={comment.liked}
          count={comment.likes}
        />
      </div>
    </ContentCardFrame>
  );
}
