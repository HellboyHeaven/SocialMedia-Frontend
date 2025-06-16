import { useAuth } from "app/providers/AuthProvider";
import { createPost } from "shared/api/post";
import { PostType } from "shared/types/post";
import CreateContentSection from "widgets/common/CreateContentSection";

type Props = {
  onPostCreated: (post: PostType) => void;
};

export default function CreatePostSection({ onPostCreated }: Props) {
  const { user } = useAuth();
  return (
    <CreateContentSection<PostType>
      show={user !== null}
      placeholderText="Anything new?"
      onContentCreated={onPostCreated}
      createFetch={createPost}
    />
  );
}
