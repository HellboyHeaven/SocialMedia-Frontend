import React from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface Props {
  medias: string[];
  activeIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function ImageModal({
  medias,
  activeIndex,
  onClose,
  onPrev,
  onNext,
}: Props) {
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl max-h-full"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={medias[activeIndex]}
          alt={`media-large-${activeIndex}`}
          className="max-w-full max-h-screen min-w-xl min-h-xl rounded-lg object-cover"
        />
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white rounded-full p-2"
          aria-label="Закрыть просмотр"
        >
          <X size={24} />
        </button>

        {medias.length > 1 && activeIndex > 0 && (
          <button
            onClick={onPrev}
            className="absolute top-1/2 left-2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white rounded-full p-2"
            aria-label="Предыдущее изображение"
          >
            <ChevronLeft size={24} />
          </button>
        )}
        {medias.length > 1 && activeIndex < medias.length - 1 && (
          <button
            onClick={onNext}
            className="absolute top-1/2 right-2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white rounded-full p-2"
            aria-label="Следующее изображение"
          >
            <ChevronRight size={24} />
          </button>
        )}
      </div>
    </div>
  );
}
