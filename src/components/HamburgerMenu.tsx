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
        top: "0.5rem",
        left: 0,
        right: 0,
        zIndex: 1000,
        ...isOpen && {
          position: "absolute",
          width: "80%"
        }
      }}
    >
      <div
        style={{
          width: "25px",
          height: "3px",
          backgroundColor: isDarkMode ? "#fff" : "#000",
          transition: "0.4s",
          transform: isOpen ? "rotate(-45deg) translate(-7px, 7px)" : "none",
          ...isOpen && {
            float: "right"
          }
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
          transform: isOpen ? "rotate(45deg) translate(-5px, -5px)" : "none",
          ...isOpen && {
            float: "right"
          }
        }}
      />
    </button>
  );
}
