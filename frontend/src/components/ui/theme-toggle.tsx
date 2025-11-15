import { IoSunnyOutline, IoMoonOutline } from "react-icons/io5";
import React from "react";

import { useTheme } from "@/components/theme-provider";

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const handleToggler = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={handleToggler}
      className="px-2.5 py-2 rounded-lg cursor-pointer text-sm disabled:opacity-50 bg-zinc-800 hover:bg-zinc-700 dark:bg-zinc-900 text-white"
    >
      {theme == "light" ? (
        <IoMoonOutline className="text-white text-xl" />
      ) : (
        <IoSunnyOutline className="text-white text-xl" />
      )}
    </button>
  );
};

export default ThemeToggle;
