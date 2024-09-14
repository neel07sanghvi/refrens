import React from "react";
import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";

interface HeaderProps
{
  onSearch: (value: string) => void;
  searchValue: string;
  onThemeToggle: () => void;
  isDarkMode: boolean;
}

export function Header(props: HeaderProps)
{
  const {
    onSearch,
    searchValue,
    onThemeToggle,
    isDarkMode
  } = props;

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem",
        backgroundColor: isDarkMode ? "#333" : "#f0f0f0",
        color: isDarkMode ? "#fff" : "#000"
      }}
    >
      <h1>Rick and Morty Characters</h1>
      <div
        style={{
          display: "flex",
          alignItems: "center"
        }}
      >
        <SearchBar value={searchValue} onChange={onSearch} />
        <ThemeToggle onToggle={onThemeToggle} isDarkMode={isDarkMode} />
      </div>
    </header>
  );
}
