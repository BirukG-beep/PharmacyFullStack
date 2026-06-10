import { useSelector } from "react-redux";
import { useMemo } from "react";

export const useTheme = () => {
  const theme = useSelector((state) => state.settings?.displaySettings?.theme);

  const colors = useMemo(() => {
    const isDark = theme === "dark";

    return {
      backgroundColor: isDark ? "#2c3e50" : "#edf1f5",
      textColor: isDark ? "#ecf0f1" : "#2c3e50",
      borderColor: isDark ? "#555" : "#dedede",
      selectBorderColor: isDark ? "#555" : "#ccc",
      labelColor: isDark ? "#ecf0f1" : "#2c3e50",
      isDarkTheme: isDark, // useful to expose
    };
  }, [theme]);

  return colors;
};