import { CSSProperties } from 'react';
import React, { useState } from 'react';
import { ICharacter } from '../types/indexPlus';
import { themeColor } from '../utils/constants';
import './CharacterCard.css';

interface ICharacterCardProps
{
  character: ICharacter;
  onClick: (id: number) => void;
  isDarkMode: boolean;
}

export default function CharacterCard({
  character,
  onClick,
  isDarkMode,
}: ICharacterCardProps)
{
  const [imageLoaded, setImageLoaded] = useState(false);

  const theme = isDarkMode ? themeColor.dark : themeColor.light;

  const textStyle = {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    margin: '4px 0',
  } as CSSProperties;

  return (
    <div
      style={{
        border: `1px solid ${theme.border}`,
        borderRadius: '8px',
        backgroundColor: theme.cardBackground,
        color: theme.text,
        cursor: 'pointer',
        transition: 'transform 0.2s',
        display: 'flex',
        flexDirection: 'column',
        height: '400px',
        maxWidth: '300px',
        overflow: 'hidden',
      }}
      onClick={() => onClick(character.id)}
      onMouseEnter={(e) =>
      {
        e.currentTarget.style.transform = 'scale(1.05)';
      }}
      onMouseLeave={(e) =>
      {
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      <div
        style={{
          width: '100%',
          paddingTop: '75%',
          position: 'relative',
          overflow: 'hidden',
          height: '55%',
        }}
      >
        <div
          className={`skeleton-loader ${imageLoaded ? 'hidden' : ''}`}
          style={{
            backgroundColor: theme.border,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />
        <img
          src={character.image}
          alt={character.name}
          onLoad={() => setImageLoaded(true)}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: imageLoaded ? 'block' : 'none',
          }}
        />
      </div>
      <div
        style={{
          padding: '16px',
          flexGrow: 1,
        }}
      >
        <h3
          style={{
            ...textStyle,
            fontSize: '1.2em',
            fontWeight: 'bold',
            marginBottom: '8px',
          }}
        >{character.name}</h3>

        <p style={textStyle}>Status: {character.status}</p>
        <p style={textStyle}>Species: {character.species}</p>
        <p style={textStyle}>Gender: {character.gender}</p>
        <p style={textStyle}>Origin: {character.origin.name}</p>
        <p style={textStyle}>Location: {character.location.name}</p>
      </div>
    </div>
  );
}
