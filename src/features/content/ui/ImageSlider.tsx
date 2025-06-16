import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTheme } from "app/providers/ThemeProvider";

export interface ImageSliderStyleProps {
  imageWidth?: string | number;
  imageHeight?: string | number;
}

interface ImageSliderProps {
  medias: string[];
  content: string;
  onImageClick?: (index: number) => void;
  style?: ImageSliderStyleProps;
}

export default function ImageSlider({
  medias,
  content,
  onImageClick,
  style = { imageWidth: 500, imageHeight: 400 },
}: ImageSliderProps) {
  const { colors } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);

  const prevImage = () => {
    if (activeIndex > 0) setActiveIndex(activeIndex - 1);
  };
  const nextImage = () => {
    if (activeIndex < medias.length - 1) setActiveIndex(activeIndex + 1);
  };

  return (
    <div className={`mt-4 max-w-lg mx-auto relative`}>
      {medias.length != 0 && (
        <img
          src={medias[activeIndex]}
          alt={`media-${activeIndex}`}
          className="mx-auto rounded-lg shadow-md object-cover cursor-pointer"
          style={{ height: style.imageHeight, width: style.imageWidth }}
          onClick={() => onImageClick?.(activeIndex)}
        />
      )}

      {medias.length > 1 && activeIndex > 0 && (
        <button
          onClick={prevImage}
          className="absolute top-[calc(50%-24px)] left-2 -translate-y-1/2 bg-black bg-opacity-40 hover:bg-opacity-60 text-white rounded-full p-2"
          aria-label="Предыдущее изображение"
        >
          <ChevronLeft size={24} />
        </button>
      )}
      {medias.length > 1 && activeIndex < medias.length - 1 && (
        <button
          onClick={nextImage}
          className="absolute top-[calc(50%-24px)] right-2 -translate-y-1/2 bg-black bg-opacity-40 hover:bg-opacity-60 text-white rounded-full p-2"
          aria-label="Следующее изображение"
        >
          <ChevronRight size={24} />
        </button>
      )}

      {medias.length > 1 && (
        <div className="flex justify-center space-x-2 mt-3">
          {medias.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`w-2 h-2 rounded-full ${
                i === activeIndex ? "bg-blue-600" : "bg-gray-300"
              }`}
              aria-label={`Перейти к изображению ${i + 1}`}
            />
          ))}
        </div>
      )}

      <p
        className="mt-4 text-base whitespace-pre-wrap"
        style={{ color: colors.text }}
      >
        {content}
      </p>
    </div>
  );
}
