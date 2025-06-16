import { useTheme } from "app/providers/ThemeProvider";
import { Share } from "lucide-react";
import { useState } from "react";

interface Props {
  posId: string;
}

export default function SharePost({ posId }: Props) {
  const { colors } = useTheme();
  const [hover, setHover] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      const url = `${window.location.origin}/post/${posId}`;
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Показываем "copied" на 2 секунды
    } catch (err) {
      console.error("Failed to copy link", err);
    }
  };

  return (
    <button
      className="flex items-center gap-2"
      style={{ color: hover || copied ? "#22c55e" : colors.tint }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={handleCopy}
    >
      <Share size={20} />
      {copied && <span className="text-sm">Copied</span>}
    </button>
  );
}
