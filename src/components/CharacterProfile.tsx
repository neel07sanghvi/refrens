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
        width: "100vw",
        height: "100vh",
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
          width: "90%",
          maxWidth: "600px",
          maxHeight: "90vh",
          overflow: "auto",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            background: "none",
            border: "none",
            fontSize: "1.5rem",
            cursor: "pointer",
            color: theme.text,
            zIndex: 10
          }}
        >
          ×
        </button>

        <div
          style={{
            marginBottom: "1.5rem"
          }}
        >
          <img
            src={character.image}
            alt={character.name}
            style={{
              width: "150px",
              height: "150px",
              objectFit: "cover",
              borderRadius: "50%",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)"
            }}
          />
        </div>

        <div
          style={{
            width: "100%",
            textAlign: "center",
            marginBottom: "2rem"
          }}
        >
          <h2 style={{margin: "0 0 1rem 0"}}>{character.name}</h2>
          <p>
            <strong>Status:</strong> {character.status}
          </p>
          <p>
            <strong>Species:</strong> {character.species}
          </p>
          <p>
            <strong>Gender:</strong> {character.gender}
          </p>
          <p>
            <strong>Origin:</strong> {character.origin.name}
          </p>
          <p>
            <strong>Location:</strong> {character.location.name}
          </p>
        </div>

        <h3
          style={{
            textAlign: "center",
            marginBottom: "1rem"
          }}
        >
          Episodes
        </h3>

        <div
          style={{
            width: "100%",
            maxHeight: "200px",
            overflowY: "auto",
            borderTop: `1px solid ${theme.text}`,
            paddingTop: "1rem"
          }}
        >
          <ul
            style={{
              listStyleType: "none",
              padding: "4px",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
              gap: "10px",
              justifyItems: "center"
            }}
          >
            {character.episode.map((ep) => (
              <li
                key={ep}
                style={{
                  minWidth: "50px",
                  backgroundColor: theme.background,
                  padding: "0.5rem 1rem",
                  borderRadius: "4px",
                  boxShadow: `0 1px 2px ${isDarkMode ? themeColor.light.background : themeColor.dark.background}`,
                  textAlign: "center"
                }}
              >
                {ep.split("/").pop()}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}
