import React from "react";
import {CharactersState} from "../types/indexPlus";
import {themeColor} from "../utils/constants";

interface FiltersProps
{
  filters: CharactersState["filters"];
  onFilterChange: (filters: Partial<CharactersState["filters"]>) => void;
  isDarkMode: boolean;
}

export default function Filters(props: FiltersProps)
{
  const {
    filters,
    onFilterChange,
    isDarkMode
  } = props;

  const theme = isDarkMode ? themeColor.dark : themeColor.light;

  const inputStyle = {
    width: "100%",
    padding: "0.5rem",
    marginBottom: "0.5rem",
    backgroundColor: theme.cardBackground,
    color: theme.text,
    border: `1px solid ${theme.border}`,
    borderRadius: "4px"
  };

  return (
    <div
      style={{
        padding: "1rem",
        backgroundColor: theme.background,
        color: theme.text,
        height: "100%"
      }}
    >
      <h3>Filters</h3>
      <input
        type="text"
        placeholder="Status"
        value={filters.status}
        onChange={(e) => onFilterChange({status: e.target.value})}
        style={inputStyle}
      />
      <input
        type="text"
        placeholder="Species"
        value={filters.species}
        onChange={(e) => onFilterChange({species: e.target.value})}
        style={inputStyle}
      />
      <input
        type="text"
        placeholder="Type"
        value={filters.type}
        onChange={(e) => onFilterChange({type: e.target.value})}
        style={inputStyle}
      />
      <input
        type="text"
        placeholder="Gender"
        value={filters.gender}
        onChange={(e) => onFilterChange({gender: e.target.value})}
        style={inputStyle}
      />
    </div>
  );
}
