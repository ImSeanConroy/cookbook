import React from "react";
import { IoSunnyOutline, IoMoonOutline } from "react-icons/io5";
import { useTheme } from "../theme-provider";

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const handleToggler = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={handleToggler}
      className="px-4 py-3 rounded-xl cursor-pointer text-sm disabled:opacity-50 bg-zinc-800 hover:bg-zinc-700 dark:bg-zinc-900 text-white"
    >
      {theme == "light" ? (
        <IoMoonOutline className="text-white text-2xl pb-0.5 pl-0.5" />
      ) : (
        <IoSunnyOutline className="text-white text-2xl pb-0.5 pl-0.5" />
      )}
    </button>
  );
};

export default ThemeToggle;
