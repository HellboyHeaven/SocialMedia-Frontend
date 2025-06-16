import { useState } from "react";
import { AxiosResponse } from "axios";
import useContentEditor from "features/content/hooks/useContentEditor";
import EditModeContent from "features/content/ui/EditModeContent";
import ImageModal from "features/content/ui/ImageModal";
import ImageSlider, {
  ImageSliderStyleProps,
} from "features/content/ui/ImageSlider";

export interface ContentStyleProps {
  imageSliderStyle: ImageSliderStyleProps;
}

interface Props {
  id: string;
  initialContent: string;
  initialMedias: string[];
  editContent: (
    id: string,
    content: string,
    oldMedias: string[],
    newMedias: File[],
  ) => Promise<AxiosResponse<{ content: string; medias: string[] }>>;
  editing: boolean;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
  onCancelEdit: () => void;
  onFinishEdit: () => void;
  style?: ContentStyleProps;
}

export default function Content({
  id,
  initialContent,
  initialMedias,
  editContent,
  editing,
  onCancelEdit,
  onFinishEdit,
  style,
}: Props) {
  const {
    content,
    setContent,
    oldMedias,
    newMedias,
    fileInputRef,
    handleCancel,
    handleSave,
    handleAddImage,
    handleRemoveImage,
    loading, // <-- получаем loading из хука
  } = useContentEditor({
    id,
    initialContent,
    initialMedias,
    editContent,
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const combinedMedias = [
    ...oldMedias,
    ...newMedias.map((file) => URL.createObjectURL(file)),
  ];

  const openModal = (index: number) => {
    setActiveIndex(index);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);
  const prevImage = () => activeIndex > 0 && setActiveIndex(activeIndex - 1);
  const nextImage = () =>
    activeIndex < combinedMedias.length - 1 && setActiveIndex(activeIndex + 1);

  const onAddImagesClick = () => fileInputRef.current?.click();
  const onFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleAddImage(e.target.files);
    e.target.value = ""; // сброс input
  };

  const onCancel = () => {
    handleCancel();
    onCancelEdit();
  };

  const onSave = async () => {
    await handleSave();
    onFinishEdit();
  };

  if (editing) {
    return (
      <div>
        <EditModeContent
          content={content}
          medias={combinedMedias}
          onChangeContent={setContent}
          onSave={onSave}
          onCancel={onCancel}
          onAddImages={onAddImagesClick}
          onRemoveImage={handleRemoveImage}
          loading={loading} // <-- передаём loading сюда
        />

        <input
          type="file"
          multiple
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={onFilesSelected}
        />
      </div>
    );
  }

  return (
    <div className="pl-2">
      {
        <ImageSlider
          medias={combinedMedias}
          content={content}
          onImageClick={openModal}
          style={style?.imageSliderStyle}
        />
      }

      {isModalOpen && (
        <ImageModal
          medias={combinedMedias}
          activeIndex={activeIndex}
          onClose={closeModal}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </div>
  );
}
