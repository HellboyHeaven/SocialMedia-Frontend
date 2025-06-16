import { useState } from "react";
import { AxiosResponse } from "axios";
import { PostType } from "shared/types/post";
import { editPost } from "shared/api/post";

interface UsePostEditResult {
  editContent: (
    id: string,
    content: string,
    oldMedias: string[],
    newMedias: File[],
  ) => Promise<AxiosResponse<{ content: string; medias: string[] }>>;
}

export default function usePostEdit(post: PostType): UsePostEditResult {
  const [loading, setLoading] = useState(false);

  const editContent = async (
    id: string,
    content: string,
    oldMedias: string[],
    newMedias: File[],
  ) => {
    try {
      setLoading(true);
      const res = await editPost(id, content, oldMedias, newMedias);
      return res;
    } catch (error) {
      console.error("Ошибка при редактировании поста:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { editContent };
}
