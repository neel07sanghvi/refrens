import React from "react";

interface ThemeToggleProps
{
  onToggle: () => void;
  isDarkMode: boolean;
}

export default function ThemeToggle(props: ThemeToggleProps)
{
  const {
    isDarkMode,
    onToggle
  } = props;

  return (
    <button
      onClick={onToggle}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        fontSize: "1.5rem",
        marginLeft: "1rem"
      }}
    >
      {isDarkMode ? "🌙" : "☀️"}
    </button>
  );
}
