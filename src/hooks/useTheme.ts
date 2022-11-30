import { createTheme, useMediaQuery } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useAppSelector } from "./useAppSelector";

export const useTheme = () => {
  const settings = useAppSelector((state) => state.user.settings);
  const lightMode = useMediaQuery("(prefers-color-scheme: light)");
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    if (settings?.darkMode === undefined) {
      setIsLight(lightMode);
    } else {
      setIsLight(!settings?.darkMode);
    }
  }, [settings.darkMode, lightMode]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: isLight ? "light" : "dark",
          primary: { main: "#3f51b5" },
        },
      }),
    [isLight]
  );

  return theme;
};
