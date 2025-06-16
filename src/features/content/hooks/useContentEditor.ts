import { useState, useRef } from "react";
import { AxiosResponse } from "axios";

interface UseContentEditorProps {
  initialContent: string;
  initialMedias: string[];
  id: string;
  editContent: (
    id: string,
    content: string,
    oldMedias: string[],
    newMedias: File[],
  ) => Promise<AxiosResponse<{ content: string; medias: string[] }>>;
}

export default function useContentEditor({
  initialContent,
  initialMedias,
  editContent,
  id,
}: UseContentEditorProps) {
  const [content, setContent] = useState(initialContent);
  const [oldMedias, setOldMedias] = useState<string[]>(initialMedias);
  const [newMedias, setNewMedias] = useState<File[]>([]);
  const [loading, setLoading] = useState(false); // <-- добавили состояние загрузки

  const originalState = useRef({
    content: initialContent,
    oldMedias: initialMedias,
    newMedias: [] as File[],
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleCancel = () => {
    setContent(originalState.current.content);
    setOldMedias(originalState.current.oldMedias);
    setNewMedias(originalState.current.newMedias);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await editContent(id, content, oldMedias, newMedias);
      const data = res.data;

      setContent(data.content);
      setOldMedias(data.medias);
      setNewMedias([]);

      originalState.current = {
        content: data.content,
        oldMedias: data.medias,
        newMedias: [],
      };
    } catch (error) {
      console.error("Ошибка при сохранении контента:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddImage = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setNewMedias((prev) => [...prev, ...Array.from(files)]);
  };

  const handleRemoveImage = (index: number) => {
    if (index < oldMedias.length) {
      setOldMedias((prev) => prev.filter((_, i) => i !== index));
    } else {
      const newIndex = index - oldMedias.length;
      setNewMedias((prev) => prev.filter((_, i) => i !== newIndex));
    }
  };

  return {
    content,
    setContent,
    oldMedias,
    newMedias,
    loading, // <-- возвращаем загрузку
    fileInputRef,
    handleCancel,
    handleSave,
    handleAddImage,
    handleRemoveImage,
  };
}
