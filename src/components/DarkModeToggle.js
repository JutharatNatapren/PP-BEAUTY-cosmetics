"use client";

import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");

    if (savedMode === "true") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    }
  }, []);

  const toggleDarkMode = () => {
    const html = document.documentElement;

    html.classList.toggle("dark");

    const isDark = html.classList.contains("dark");

    setDarkMode(isDark);
    localStorage.setItem("darkMode", isDark ? "true" : "false");
  };

  return (
    <button
      type="button"
      onClick={toggleDarkMode}
      className={`relative flex h-8 w-16 items-center rounded-full p-1 transition-all duration-300 ${
        darkMode
          ? "bg-pink-600"
          : "bg-gray-300"
      }`}
    >
      <span
        className={`flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs shadow-md transition-transform duration-300 ${
          darkMode
            ? "trangray-x-8"
            : "trangray-x-0"
        }`}
      >
        {darkMode ? "🌙" : "☀️"}
      </span>
    </button>
  );
}