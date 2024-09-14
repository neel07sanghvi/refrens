// const CharactersPage = lazy(() => import("./components/CharactersPage"));
import React, {useEffect, useState} from "react";
import "./App.css";
import CharacterGrid from "./components/CharacterGrid";
import CharacterProfile from "./components/CharacterProfile";
import Filters from "./components/Filters";
import {Header} from "./components/Header";
import Pagination from "./components/Pagination";
import {useCharacters} from "./hooks/useCharacters";
import {useWindowSize} from "./hooks/useWindowSize";
import {themeColor} from "./utils/constants";

export default function App()
{
  const {
    state,
    loadCharacters,
    setFilters,
    setPage
  } = useCharacters();

  const [selectedCharacterId, setSelectedCharacterId] = useState<number | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {isMobile} = useWindowSize();

  const toggleTheme = () =>
  {
    setIsDarkMode(!isDarkMode);
  };

  const toggleMenu = () =>
  {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (value: string) =>
  {
    setFilters({name: value});
  };

  const handleFilterChange = (newFilters: Partial<typeof state.filters>) =>
  {
    setFilters(newFilters);
  };

  const handlePageChange = (page: number) =>
  {
    setPage(page);
  };

  const handleCharacterClick = (id: number) =>
  {
    setSelectedCharacterId(id);
  };

  useEffect(() =>
  {
    loadCharacters();

  }, [loadCharacters, state.version]);

  return (
    <div
      style={{
        backgroundColor: isDarkMode ? themeColor.dark.background : themeColor.light.background,
        color: isDarkMode ? themeColor.dark.text : themeColor.light.text,
        height: "100vh",
        width: "100%",
        overflowX: "hidden"
      }}
    >
      <Header
        onSearch={handleSearch}
        searchValue={state.filters.name}
        onThemeToggle={toggleTheme}
        isDarkMode={isDarkMode}
        isMenuOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        isMobile={isMobile}
      />
      <div
        style={{
          display: "flex",
          position: "relative"
        }}
      >
        {isMobile && isMenuOpen && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 800
            }}
            onClick={toggleMenu}
          />
        )}

        <div
          style={{
            width: isMobile ? "80%" : "250px",
            position: isMobile ? "fixed" : "sticky",
            top: isMobile ? "0" : "60px",
            left: 0,
            bottom: 0,
            zIndex: 900,
            overflowY: "auto",
            transition: "0.3s",
            transform: isMobile && !isMenuOpen ? "translateX(-100%)" : "translateX(0)",
            boxShadow: isMobile ? "2px 0 5px rgba(0, 0, 0, 0.1)" : "none",
            backgroundColor: isDarkMode ? themeColor.dark.background : themeColor.light.background
          }}
        >
          <Filters
            filters={state.filters}
            onFilterChange={handleFilterChange}
            isDarkMode={isDarkMode}
          />
        </div>

        <div
          style={{
            flex: 1,
            padding: "1rem"
          }}
        >
          {state.loading ? (
            <div>Loading...</div>
          ) : state.error ? (
            <div>Error: {state.error}</div>
          ) : (
            <>
              <CharacterGrid
                characters={state.characters[state.currentPage] || []}
                onCharacterClick={handleCharacterClick}
                isDarkMode={isDarkMode}
              />
              <Pagination
                currentPage={state.currentPage}
                totalPages={state.totalPages}
                onPageChange={handlePageChange}
                isDarkMode={isDarkMode}
              />
            </>
          )}
        </div>

        {selectedCharacterId && (
          <CharacterProfile
            characterId={selectedCharacterId}
            onClose={() => setSelectedCharacterId(null)}
            isDarkMode={isDarkMode}
          />
        )}
      </div>
    </div>
  );
}
