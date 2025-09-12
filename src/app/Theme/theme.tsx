"use client";

import { createTheme, ThemeProvider, PaletteMode } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { createContext, useContext, useMemo, useState, ReactNode, useEffect } from "react";

interface ColorModeContextValue {
  mode: PaletteMode;
  toggleColorMode: () => void;
}

const ColorModeContext = createContext<ColorModeContextValue | undefined>(undefined);

export const useColorMode = () => {
  const ctx = useContext(ColorModeContext);
  if (!ctx) throw new Error("useColorMode must be used within ColorModeProvider");
  return ctx;
};

export const ColorModeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<PaletteMode>("light");

  useEffect(() => {
    const saved = localStorage.getItem("themeMode") as PaletteMode;
    if (saved) setMode(saved);
  }, []);

  const toggleColorMode = () => setMode((prev) => {
    const next = prev === "light" ? "dark" : "light";
    localStorage.setItem("themeMode", next);
    return next;
  });

  const theme = useMemo(
    () => createTheme({ palette: { mode, primary: { main: "#2196f3" } } }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={{ mode, toggleColorMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
