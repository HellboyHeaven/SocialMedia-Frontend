import { createContext, PropsWithChildren, useContext, useState } from "react";

import { DarkColor, LightColor, ThemeColors } from "shared/constants/colors";

type ThemeContextType = {
  colors: ThemeColors;
  setTheme: (theme: "dark" | "light") => void;
  theme: "dark" | "light";
  toggle: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export default function ThemeProvider({ children }: PropsWithChildren) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const getColors = () => (theme == "dark" ? DarkColor : LightColor);

  const toggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <ThemeContext.Provider
      value={{
        colors: getColors(),
        setTheme,
        theme,
        toggle,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useSchedule must be used within a ScheduleProvider");
  }
  return context;
};
