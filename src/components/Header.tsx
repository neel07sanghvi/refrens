import React from "react";
import HamburgerMenu from "./HamburgerMenu";
import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";

interface IHeaderProps
{
  onSearch: (value: string) => void;
  searchValue: string;
  onThemeToggle: () => void;
  isDarkMode: boolean;
  isMenuOpen: boolean;
  isMobile: boolean;
  toggleMenu: () => void;
}

export function Header(props: IHeaderProps)
{
  const {
    onSearch,
    searchValue,
    onThemeToggle,
    isDarkMode,
    isMenuOpen,
    isMobile,
    toggleMenu
  } = props;

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem",
        backgroundColor: isDarkMode ? "#333" : "#f0f0f0",
        color: isDarkMode ? "#fff" : "#000",
        position: "relative"
      }}
    >
      {isMobile && (
        <HamburgerMenu
          isOpen={isMenuOpen}
          onToggle={toggleMenu}
          isDarkMode={isDarkMode}
        />
      )}

      {!isMobile && <h1>Rick and Morty Characters</h1>}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexGrow: 1,
          justifyContent: "space-between",
          paddingLeft: "2rem"
        }}
      >
        <SearchBar
          value={searchValue}
          onChange={onSearch}
          isDarkMode={isDarkMode}
        />
        <ThemeToggle
          onToggle={onThemeToggle}
          isDarkMode={isDarkMode}
        />
      </div>
    </header>
  );
}
