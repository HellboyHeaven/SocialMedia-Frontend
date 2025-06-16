import React, { useState, useRef } from "react";
import { Camera } from "lucide-react";

type AvatarPickerProps = {
  size?: number;
  onChange: (file: File | null) => void;
  initialPreview?: string | undefined;
};

export function AvatarPicker({
  size = 100,
  onChange,
  initialPreview = undefined,
}: AvatarPickerProps) {
  const [preview, setPreview] = useState<string | undefined>(initialPreview);
  const [hover, setHover] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file) {
      setPreview(URL.createObjectURL(file));
      onChange(file);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const placeholder =
    "https://static.vecteezy.com/system/resources/previews/009/292/244/large_2x/default-avatar-icon-of-social-media-user-vector.jpg";

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        position: "relative",
        cursor: "pointer",
        overflow: "hidden",
        border: "2px solid #ccc",
        userSelect: "none",
        zIndex: 10,
      }}
    >
      <img
        src={preview ?? placeholder}
        alt="avatar"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: hover ? "brightness(50%)" : "none",
          transition: "filter 0.3s",
        }}
      />
      {hover && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontWeight: "bold",
            fontSize: size / 5,
            backgroundColor: "rgba(0,0,0,0.3)",
            pointerEvents: "none",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <Camera size={size / 4} color="white" />
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </div>
  );
}
