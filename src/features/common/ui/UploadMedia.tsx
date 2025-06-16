import { useTheme } from "app/providers/ThemeProvider";
import { useState, useRef } from "react";

interface UploadMediaProps {
  onUpload: (files: File[]) => void;
  multiple?: boolean;
}

export default function UploadMedia({
  onUpload,
  multiple = false,
}: UploadMediaProps) {
  const { colors } = useTheme();
  const [hover, setHover] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      onUpload(filesArray);
      e.target.value = "";
    }
  };

  return (
    <>
      <button
        type="button"
        className="w-24 h-24 border-2 border-dashed rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
        style={{ color: hover ? colors.text : colors.tint }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={handleClick}
        aria-label="Добавить фото"
      >
        + Add Photo
      </button>
      <input
        type="file"
        accept="image/*"
        multiple={multiple}
        ref={inputRef}
        onChange={handleChange}
        className="hidden"
      />
    </>
  );
}
