import React, { createContext, useContext, ReactNode, useState } from "react";

type Theme = {
  name: string;
  primary: string;
  secondary: string;
  textColor: string;
  //   [key: string]: string;
};

interface ThemeContextProps {
  theme: Theme;
  themes: Theme[];
  themeIndex: number;
  setTheme: (themeIndex: number) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const themes: Theme[] = [
    {
      name: "light",
      primary: "rgb(240, 242, 245)",
      secondary: "#ccc",
      textColor: "#000",
    },
    {
      name: "dark",
      primary: "#333333",
      secondary: "#555555",
      textColor: "#fff",
    },
    {
      name: "blue",
      primary: "#3498db",
      secondary: "#2980b9",
      textColor: "#fff",
    },
    {
      name: "purple",
      primary: "#9b59b6",
      secondary: "#8e44ad",
      textColor: "#fff",
    },
    {
      name: "orange",
      primary: "#e67e22",
      secondary: "#d35400",
      textColor: "#fff",
    },
  ];

  const [themeIndex, setThemeIndex] = useState<number>(0);

  const setTheme = (index: number) => {
    setThemeIndex(index);
  };

  const theme = themes[themeIndex];

  return (
    <ThemeContext.Provider value={{ theme, themes, themeIndex, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export default ThemeProvider;
