import { CommentWithPostType, CommentType } from "shared/types/comment";
import { PostType } from "shared/types/post";

type PostWithComments = {
  post: PostType;
  comments: CommentType[];
};

export function groupCommentsByPost(
  comments: CommentWithPostType[],
): PostWithComments[] {
  const postMap = new Map<string, PostWithComments>();
  for (const comment of comments) {
    if (comment.post == null) continue;
    const postId = comment.post.id;

    if (!postMap.has(postId)) {
      postMap.set(postId, {
        post: comment.post,
        comments: [],
      });
    }

    const postWithComments = postMap.get(postId)!;

    postWithComments.comments.push({
      id: comment.id,
      author: comment.author,
      content: comment.content,
      medias: comment.medias,
      createdAt: comment.createdAt,
      likes: comment.likes,
      liked: comment.liked,
    });
  }

  return Array.from(postMap.values());
}
