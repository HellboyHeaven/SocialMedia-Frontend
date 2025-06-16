import { useState, ChangeEvent } from "react";
import { useTheme } from "app/providers/ThemeProvider";
import UploadMedia from "features/common/ui/UploadMedia";
import Publish from "features/common/ui/Publish";
import { AxiosResponse } from "axios";

type Props<T> = {
  show: boolean;
  placeholderText: string;
  onContentCreated: (post: T) => void;
  createFetch: (content: string, media: File[]) => Promise<AxiosResponse>;
};

export default function CreateContentSection<T>({
  show,
  placeholderText,
  onContentCreated,
  createFetch,
}: Props<T>) {
  const { colors } = useTheme();
  const [content, setContent] = useState("");
  const [media, setMedia] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleUpload = (files: File[]) => {
    // Добавляем новые файлы к уже выбранным
    const newFiles = Array.from(files);
    const updatedFiles = [...media, ...newFiles];
    setMedia(updatedFiles);

    // Создаем новые превью для всех файлов
    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleRemoveImage = (index: number) => {
    // Освобождаем объект URL для удаляемого превью
    URL.revokeObjectURL(previews[index]);

    const updatedMedia = [...media];
    const updatedPreviews = [...previews];
    updatedMedia.splice(index, 1);
    updatedPreviews.splice(index, 1);

    setMedia(updatedMedia);
    setPreviews(updatedPreviews);
  };

  const handlePublishSuccess = (newContent: T) => {
    // Освободить все URL объектов
    previews.forEach((url) => URL.revokeObjectURL(url));

    setContent("");
    setMedia([]);
    setPreviews([]);
    onContentCreated(newContent);
  };

  if (!show) return null;

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="items-stretch p-5 bg-white rounded-2xl shadow-lg"
      style={{ background: colors.primary }}
    >
      {/* Превью миниатюры с удалением */}
      {previews.length > 0 && (
        <div className="flex flex-wrap gap-3 mb-4">
          {previews.map((src, index) => (
            <div
              key={index}
              className="relative group w-24 h-24 rounded-lg overflow-hidden shadow"
            >
              <img
                src={src}
                alt={`preview-${index}`}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 text-xs hover:bg-red-700"
                aria-label="Удалить изображение"
              >
                ✕
              </button>
            </div>
          ))}
          <div>
            <UploadMedia onUpload={handleUpload} />
          </div>
        </div>
      )}

      {/* Если нет превью, показываем кнопку добавления */}
      {previews.length === 0 && (
        <div className="mb-4">
          <UploadMedia onUpload={handleUpload} />
        </div>
      )}

      <textarea
        value={content}
        onChange={handleContentChange}
        placeholder={placeholderText}
        className="w-full p-3 rounded-lg resize-none"
        rows={5}
        style={{ color: colors.text, backgroundColor: colors.primary }}
      />

      <div className="flex justify-end mt-4">
        <Publish
          content={content}
          medias={media}
          onSuccess={handlePublishSuccess}
          createFetch={createFetch}
        />
      </div>
    </form>
  );
}
