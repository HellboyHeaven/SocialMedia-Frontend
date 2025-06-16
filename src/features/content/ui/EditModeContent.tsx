import React from "react";
import { TextareaAutosize } from "@mui/material";
import { useTheme } from "app/providers/ThemeProvider";
import { motion } from "framer-motion";
import { LoaderCircle } from "lucide-react";

interface Props {
  content: string;
  medias: string[];
  onChangeContent: (value: string) => void;
  onSave: () => void;
  onCancel: () => void;
  onAddImages?: () => void;
  onRemoveImage?: (index: number) => void;
  loading?: boolean; // добавим пропс loading
}

function Loading() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
    >
      <LoaderCircle size={20} />
    </motion.div>
  );
}

export default function EditModeContent({
  content,
  medias,
  onChangeContent,
  onSave,
  onCancel,
  onAddImages,
  onRemoveImage,
  loading = false,
}: Props) {
  const { colors } = useTheme();

  return (
    <div>
      <TextareaAutosize
        value={content}
        onChange={(e) => onChangeContent(e.target.value)}
        className="w-full p-2 border rounded text-base resize-none"
        placeholder="Enter text..."
        style={{
          color: colors.text,
          backgroundColor: colors.background,
        }}
      />

      <div className="flex flex-wrap gap-3 mt-4">
        {medias.map((src, index) => (
          <div key={index} className="relative group">
            <img
              src={src}
              alt={`preview-${index}`}
              className="w-32 h-32 object-cover rounded-lg shadow"
            />
            {onRemoveImage && (
              <button
                onClick={() => onRemoveImage(index)}
                className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 text-sm hover:bg-red-700"
              >
                ✕
              </button>
            )}
          </div>
        ))}
        {onAddImages && (
          <button
            onClick={onAddImages}
            className="w-32 h-32 border-2 border-dashed rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100"
          >
            + Добавить
          </button>
        )}
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={onSave}
          disabled={loading}
          className={`px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center justify-center ${
            loading ? "cursor-not-allowed opacity-70" : ""
          }`}
        >
          {loading ? <Loading /> : "Save"}
        </button>
        <button
          onClick={onCancel}
          disabled={loading}
          className="px-4 py-2 text-sm bg-gray-300 text-black rounded hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
