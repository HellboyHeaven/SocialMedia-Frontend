import { useState } from "react";
import ContentCardFrame, {
  ContentCardFrameStyle,
} from "features/content/ui/ContentCardFrame";
import UserHeader from "features/common/ui/UserHeader";
import ActionMenu from "features/content/ui/ActionMenu";
import LikePost from "features/post/ui/LikePost";
import CommentPost from "features/post/ui/CommentPost";
import SharePost from "features/post/ui/SharePost";
import { PostType } from "shared/types/post";
import Content, { ContentStyleProps } from "widgets/common/Content";
import usePostEdit from "features/post/hooks/usePostEdit";
import { useAuth } from "app/providers/AuthProvider";
import { deletePost } from "shared/api/post";

export interface PostStyleProps {
  contentStyle?: ContentStyleProps;
  frameStyle?: ContentCardFrameStyle;
}

interface Props {
  post: PostType;
  style?: PostStyleProps;
}

export default function Post({ post, style }: Props) {
  const { user } = useAuth();
  const { editContent } = usePostEdit(post);
  const [deleted, setDeleted] = useState(false);
  const [editing, setEditing] = useState(false);

  const handleEdit = () => setEditing(true);
  const handleCancelEdit = () => setEditing(false);
  const handleFinishEdit = () => setEditing(false);
  if (deleted) return <></>;

  const canDelete = user?.username == post.author?.username || user?.isAdmin;
  const canEdit = user?.username == post.author?.username;

  return (
    <ContentCardFrame style={style?.frameStyle}>
      <div className="ml-2 mb-5 flex justify-between">
        <UserHeader user={post.author} time={post.createdAt} />
        {canDelete && (
          <ActionMenu
            onEdit={canEdit ? handleEdit : undefined}
            onDelete={async () => {
              if (deleted) return; // блокируем если уже удаляется
              await deletePost(post.id);
              setDeleted(true);
            }}
          />
        )}
      </div>

      {post && (
        <>
          <Content
            id={post.id}
            initialContent={post.content}
            initialMedias={post.medias}
            editContent={editContent}
            editing={editing}
            setEditing={setEditing}
            onCancelEdit={handleCancelEdit}
            onFinishEdit={handleFinishEdit}
            style={style?.contentStyle}
          />

          <div className="flex justify-between mt-5 mx-7">
            <LikePost
              targetId={post.id}
              liked={post.liked}
              count={post.likes}
            />
            <CommentPost postId={post.id} count={post.comments} />
            <SharePost posId={post.id} />
          </div>
        </>
      )}
    </ContentCardFrame>
  );
}
