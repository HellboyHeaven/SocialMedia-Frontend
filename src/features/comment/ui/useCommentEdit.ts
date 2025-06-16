import { AxiosResponse } from "axios";
import { editComment } from "shared/api/comment";

interface UsePostEditResult {
  editContent: (
    id: string,
    content: string,
    oldMedias: string[],
    newMedias: File[],
  ) => Promise<AxiosResponse<{ content: string; medias: string[] }>>;
}

export default function useCommentEdit(): UsePostEditResult {
  const editContent = async (
    id: string,
    content: string,
    oldMedias: string[],
    newMedias: File[],
  ) => {
    try {
      const res = await editComment(id, content, oldMedias, newMedias);
      return res;
    } catch (error) {
      console.error("Ошибка при редактировании поста:", error);
      throw error;
    }
  };

  return { editContent };
}
