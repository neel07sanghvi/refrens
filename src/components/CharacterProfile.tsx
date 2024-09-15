import React, {useEffect, useState} from "react";
import {fetchCharacterById, fetchEpisodeByUrl, fetchLocationById} from "../services/api";
import {ICharacter, IEpisode, ILocation} from "../types/indexPlus";
import {themeColor} from "../utils/constants";

interface ICharacterProfileProps
{
  characterId: number;
  onClose: () => void;
  isDarkMode: boolean;
}

export default function CharacterProfile(props: ICharacterProfileProps)
{
  const {
    characterId,
    onClose,
    isDarkMode
  } = props;
  const theme = isDarkMode ? themeColor.dark : themeColor.light;

  const [character, setCharacter] = useState<ICharacter>();
  const [origin, setOrigin] = useState<ILocation>();
  const [location, setLocation] = useState<ILocation>();
  const [episodes, setEpisodes] = useState<IEpisode[]>([]); // Store fetched episodes
  const [loading, setLoading] = useState(true);
  const [loadingEpisodes, setLoadingEpisodes] = useState(true); // Loading state for episodes

  useEffect(() =>
  {
    const loadCharacterAndLocations = async() =>
    {
      try
      {
        const characterData = await fetchCharacterById(characterId);
        setCharacter(characterData);

        if(characterData.origin.url)
        {
          const originId = extractIdFromUrl(characterData.origin.url);
          const originData = await fetchLocationById(originId);
          setOrigin(originData);
        }

        if(characterData.location.url)
        {
          const locationId = extractIdFromUrl(characterData.location.url);
          const locationData = await fetchLocationById(locationId);
          setLocation(locationData);
        }

        // Fetch episode details
        const episodePromises = characterData.episode.map((epUrl) =>
          fetchEpisodeByUrl(epUrl)
        );
        const fetchedEpisodes = await Promise.all(episodePromises);
        setEpisodes(fetchedEpisodes);
      }
      catch(error)
      {
        console.error("Failed to fetch character, location, or episode data:", error);
      }
      finally
      {
        setLoading(false);
        setLoadingEpisodes(false); // Episodes fetched
      }
    };

    loadCharacterAndLocations();
  }, [characterId]);

  const extractIdFromUrl = (url: string) =>
  {
    const parts = url.split("/");
    return parseInt(parts[parts.length - 1]);
  };

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
          padding: "1rem",
          borderRadius: "8px",
          width: "90%",
          maxWidth: "800px",
          height: "90vh",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column"
        }}
      >
        {loading && <p> Loading... </p>}

        {!character && <p> Character not found </p>}

        {(!loading && character) && (
          <>
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
                display: "flex",
                flexDirection: "column",
                flex: 1,
                overflowY: "auto"
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginBottom: "1rem"
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
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                    marginBottom: "1rem"
                  }}
                />
                <h2
                  style={{
                    margin: "0 0 1rem 0",
                    fontSize: "2rem",
                    textAlign: "center"
                  }}
                >
                  {character.name}
                </h2>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem",
                  marginBottom: "1rem"
                }}
              >
                <LocationInfo title="Origin" location={origin} />
                <LocationInfo title="Current Location" location={location} />
              </div>

              <div
                style={{
                  marginTop: "1rem",
                  paddingBottom: "1rem",
                  flex: 1
                }}
              >
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
                    maxHeight: "150px",
                    overflowY: "auto",
                    borderTop: `1px solid ${theme.text}`,
                    paddingTop: "1rem",
                    paddingBottom: "0.5rem"
                  }}
                >
                  {loadingEpisodes ? (
                    <p>Loading episodes...</p>
                  ) : (
                    <ul
                      style={{
                        listStyleType: "none",
                        padding: "4px",
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))",
                        gap: "10px",
                        justifyItems: "center"
                      }}
                    >
                      {episodes.map((ep) => (
                        <li
                          key={ep.id}
                          style={{
                            backgroundColor: theme.cardBackground,
                            padding: "0.5rem",
                            borderRadius: "4px",
                            boxShadow: `0 1px 2px ${
                              isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"
                            }`,
                            textAlign: "center",
                            width: "100%",
                            wordWrap: "break-word", // Ensures long text breaks into the next line
                            overflow: "hidden", // Prevents overflow
                            whiteSpace: "normal", // Allow text to wrap normally
                            display: "flex", // Ensures flexibility in box size
                            justifyContent: "center", // Aligns text at the center
                            alignItems: "center" // Ensures vertical centering
                          }}
                        >
                          {ep.name} ({ep.episode})
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function LocationInfo(props: {title: string; location?: ILocation})
{
  const {
    title,
    location
  } = props;

  return (
    <div
      style={{
        backgroundColor: "rgba(0,0,0,0.05)",
        padding: "1rem",
        borderRadius: "8px"
      }}
    >
      <h3
        style={{
          marginTop: 0,
          marginBottom: "0.5rem"
        }}
      >{title}</h3>
      {location ? (
        <div
          style={{
            display: "grid",
            gap: "0.5rem"
          }}
        >
          <p>
            <strong>Name:</strong> {location.name}
          </p>
          <p>
            <strong>Type:</strong> {location.type}
          </p>
          <p>
            <strong>Dimension:</strong> {location.dimension}
          </p>
          <p>
            <strong>Residents:</strong> {location.residents.length}
          </p>
        </div>
      ) : (
        <p>Unknown</p>
      )}
    </div>
  );
}
