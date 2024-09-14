import React, {useEffect, useState} from "react";
import {fetchCharacterById} from "../services/api";
import {Character} from "../types/indexPlus";
import {themeColor} from "../utils/constants";

interface CharacterProfileProps
{
  characterId: number;
  onClose: () => void;
  isDarkMode: boolean;
}

export default function CharacterProfile(props: CharacterProfileProps)
{
  const {
    characterId,
    onClose,
    isDarkMode
  } = props;

  const theme = isDarkMode ? themeColor.dark : themeColor.light;

  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() =>
  {
    const loadCharacter = async() =>
    {
      try
      {
        const data = await fetchCharacterById(characterId);
        setCharacter(data);
      }
      catch(error)
      {
        console.error("Failed to fetch character:", error);
      }
      finally
      {
        setLoading(false);
      }
    };

    loadCharacter();
  }, [characterId]);

  if(loading) return <div>Loading...</div>;
  if(!character) return <div>Character not found</div>;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000
      }}
    >
      <div
        style={{
          backgroundColor: theme.background,
          color: theme.text,
          padding: "2rem",
          borderRadius: "8px",
          maxWidth: "600px",
          maxHeight: "80vh",
          overflow: "auto",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
        }}
      >
        <button
          onClick={onClose}
          style={{
            float: "right",
            background: "none",
            border: "none",
            fontSize: "1.5rem",
            cursor: "pointer",
            color: theme.text
          }}
        >
          ×
        </button>
        <h2 style={{marginTop: 0}}>{character.name}</h2>
        <img
          src={character.image}
          alt={character.name}
          style={{
            width: "200px",
            height: "200px",
            objectFit: "cover",
            borderRadius: "8px"
          }}
        />
        <p><strong>Status:</strong> {character.status}</p>
        <p><strong>Species:</strong> {character.species}</p>
        <p><strong>Gender:</strong> {character.gender}</p>
        <p><strong>Origin:</strong> {character.origin.name}</p>
        <p><strong>Location:</strong> {character.location.name}</p>
        <h3>Episodes:</h3>
        <ul
          style={{
            maxHeight: "150px",
            overflowY: "auto",
            padding: "0 1rem"
          }}
        >
          {character.episode.map((ep) => (
            <li key={ep}>{ep.split("/").pop()}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
