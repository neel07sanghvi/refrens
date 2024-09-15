import React from "react";
import {useDebounce} from "../hooks/useDebounce";
import {themeColor} from "../utils/constants";

interface ISearchBarProps
{
  value: string;
  onChange: (value: string) => void;
  isDarkMode: boolean;
}

export default function SearchBar(props: ISearchBarProps)
{
  const {
    value,
    onChange,
    isDarkMode
  } = props;

  const theme = isDarkMode ? themeColor.dark : themeColor.light;

  const {
    debouncedValue,
    setDebouncedValue
  } = useDebounce(
    value,
    onChange
  );

  return (
    <div
      style={{
        position: "relative",
        width: "70%"
      }}
    >
      <input
        type="text"
        placeholder="Search characters"
        value={debouncedValue}
        onChange={(e) => setDebouncedValue(e.target.value)}
        style={{
          width: "100%",
          padding: "10px 40px 10px 15px",
          fontSize: "16px",
          border: `2px solid ${theme.border}`,
          borderRadius: "20px",
          backgroundColor: theme.cardBackground,
          color: theme.text,
          transition: "all 0.3s ease",
          outline: "none"
        }}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke={theme.text}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          position: "absolute",
          right: "15px",
          top: "50%",
          transform: "translateY(-50%)",
          width: "20px",
          height: "20px",
          pointerEvents: "none"
        }}
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    </div>
  );
}
