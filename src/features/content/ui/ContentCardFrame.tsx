import { useTheme } from "app/providers/ThemeProvider";
import { PropsWithChildren } from "react";

export interface ContentCardFrameStyle {
  background: string;
}

type ContentProps = PropsWithChildren & {
  style?: ContentCardFrameStyle;
};

export default function ContentCardFrame({ children, style }: ContentProps) {
  const { colors } = useTheme();

  return (
    <div
      className="flex-1 py-6 p-5 rounded-2xl "
      style={{ background: style?.background ?? colors.primary }}
    >
      {children}
    </div>
  );
}
