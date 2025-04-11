import React from 'react';
import { FiMoon, FiSun } from "react-icons/fi";
import { useDarkMode } from "../../contexts/Themecontext.jsx";

export const DarkModeToggler = () => {
  const { darkMode, setDarkMode } = useDarkMode();

  return (
    <button
      onClick={() => setDarkMode(!darkMode)} // Toggle dark mode
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
    >
      {darkMode ? <FiSun className="h-5 w-5" /> : <FiMoon className="h-5 w-5" />}
    </button>
  );
};

