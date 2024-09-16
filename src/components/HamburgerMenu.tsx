import React from 'react';

interface IHamburgerMenuProps
{
  isOpen?: boolean;
  onToggle: () => void;
  isDarkMode: boolean;
}

export default function HamburgerMenu(props: IHamburgerMenuProps)
{
  const {
    onToggle,
    isOpen,
    isDarkMode,
  } = props;

  const iconColor = isDarkMode ? '#fff' : '#000';

  return (
    <button
      onClick={onToggle}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '0.5rem',
        top: '0.5rem',
        left: 0,
        right: 0,
        zIndex: 900,
        ...(isOpen && {
          position: 'absolute',
        }),
      }}
    >
      {isOpen ? (
        <svg
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ float: 'right' }}
        >
          <path
            d="M18.75 6.25L6.25 18.75"
            stroke={iconColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6.25 6.25L18.75 18.75"
            stroke={iconColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.125 6.25H21.875"
            stroke={iconColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3.125 12.5H21.875"
            stroke={iconColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3.125 18.75H21.875"
            stroke={iconColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}
