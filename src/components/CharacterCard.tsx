import {useState} from "react";
import React from "react";
import {ICharacter} from "../types/indexPlus";
import {themeColor} from "../utils/constants";

interface CharacterCardProps
{
  character: ICharacter;
  onClick: (id: number) => void;
  isDarkMode: boolean;
}

export default function CharacterCard(props: CharacterCardProps)
{
  const {
    character,
    onClick,
    isDarkMode
  } = props;

  const theme = isDarkMode ? themeColor.dark : themeColor.light;

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(character.id)}
      style={{
        cursor: "pointer",
        border: `1px solid ${theme.border}`,
        borderRadius: "8px",
        padding: "1rem",
        backgroundColor: theme.cardBackground,
        color: theme.text,
        transition: "transform 0.2s",
        transform: isHovered ? "scale(1.05)" : "scale(1)"
      }}
    >
      <img
        src={character.image}
        alt={character.name}
        style={{
          width: "100%",
          borderRadius: "8px"
        }}
      />
      <h3
        style={{
          marginTop: "0.5rem",
          marginBottom: "0.25rem"
        }}
      >{character.name}</h3>
      <p style={{margin: "0.25rem 0"}}>Status: {character.status}</p>
      <p style={{margin: "0.25rem 0"}}>Species: {character.species}</p>
    </div>
  );
}
