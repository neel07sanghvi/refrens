import React from "react";
import {ICharacter} from "../types/indexPlus";
import {themeColor} from "../utils/constants";
import CharacterCard from "./CharacterCard";

interface CharacterGridProps
{
  characters: ICharacter[];
  onCharacterClick: (id: number) => void;
  isDarkMode: boolean;
}

export default function CharacterGrid(props: CharacterGridProps)
{
  const {
    characters,
    onCharacterClick,
    isDarkMode
  } = props;

  const theme = isDarkMode ? themeColor.dark : themeColor.light;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "1rem",
        padding: "1rem",
        backgroundColor: theme.background
      }}
    >
      {characters.map((character) => (
        <div key={character.id}>
          <CharacterCard
            character={character}
            onClick={onCharacterClick}
            isDarkMode={isDarkMode}
          />
        </div>
      ))}
    </div>
  );
}
