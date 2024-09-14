import React from "react";

interface HamburgerMenuProps
{
  isOpen: boolean;
  onToggle: () => void;
  isDarkMode: boolean;
}

export default function HamburgerMenu(props: HamburgerMenuProps)
{
  const {
    isDarkMode,
    isOpen,
    onToggle
  } = props;

  return (
    <button
      onClick={onToggle}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: "0.5rem",
        position: "fixed",
        top: "1rem",
        left: "1rem",
        zIndex: 1000
      }}
    >
      <div
        style={{
          width: "25px",
          height: "3px",
          backgroundColor: isDarkMode ? "#fff" : "#000",
          margin: "5px 0",
          transition: "0.4s",
          transform: isOpen ? "rotate(-45deg) translate(-5px, 6px)" : "none"
        }}
      />
      <div
        style={{
          width: "25px",
          height: "3px",
          backgroundColor: isDarkMode ? "#fff" : "#000",
          margin: "5px 0",
          transition: "0.4s",
          opacity: isOpen ? 0 : 1
        }}
      />
      <div
        style={{
          width: "25px",
          height: "3px",
          backgroundColor: isDarkMode ? "#fff" : "#000",
          margin: "5px 0",
          transition: "0.4s",
          transform: isOpen ? "rotate(45deg) translate(-5px, -6px)" : "none"
        }}
      />
    </button>
  );
}
