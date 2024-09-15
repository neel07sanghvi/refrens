import React from "react";
import {useDebounce} from "../hooks/useDebounce";
import {TypeSpecies} from "../types/indexPlus";
import {TypeGender} from "../types/indexPlus";
import {TypeStatus} from "../types/indexPlus";
import {ICharactersState} from "../types/indexPlus";
import {themeColor} from "../utils/constants";

interface IFiltersProps
{
  filters: ICharactersState["filters"];
  onFilterChange: (filters: Partial<ICharactersState["filters"]>) => void;
  isDarkMode: boolean;
}

export default function Filters(props: IFiltersProps)
{
  const {
    filters,
    onFilterChange,
    isDarkMode
  } = props;

  const theme = isDarkMode ? themeColor.dark : themeColor.light;

  const {
    debouncedValue,
    setDebouncedValue
  } = useDebounce(
    filters.type,
    (val) => onFilterChange({
      type: val
    })
  );

  return (
    <div
      style={{
        padding: "1rem",
        backgroundColor: theme.background,
        color: theme.text,
        height: "100%",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        borderRight: `1px solid ${theme.border}`
      }}
    >
      <h3>Filters</h3>

      <DropDown
        value={filters.status}
        onChange={(value) => onFilterChange({status: value as TypeStatus})}
        optionArr={["dead", "unknown", "alive"] as TypeStatus[]}
        isDarkMode={isDarkMode}
        label={"Status"}
      />

      <DropDown
        value={filters.gender}
        onChange={(value) => onFilterChange({gender: value as TypeGender})}
        optionArr={["male", "female", "genderless", "unknown"] as TypeGender[]}
        isDarkMode={isDarkMode}
        label={"Gender"}
      />

      <DropDown
        value={filters.species}
        onChange={(value) => onFilterChange({species: value as TypeSpecies})}
        optionArr={["human", "alien", "humanoid", "unknown"] as TypeSpecies[]}
        isDarkMode={isDarkMode}
        label={"Species"}
      />

      <input
        type="text"
        placeholder="Type"
        value={debouncedValue}
        onChange={(e) => setDebouncedValue(e.target.value)}
        style={{
          width: "100%",
          padding: "0.5rem",
          marginBottom: "0.5rem",
          backgroundColor: theme.cardBackground,
          color: theme.text,
          border: `1px solid ${theme.border}`,
          borderRadius: "4px"
        }}
      />

    </div>
  );
}

function DropDown(props: {
  value?: string,
  onChange: (value?: string) => void,
  optionArr: string[],
  label: string,
  isDarkMode: boolean;
})
{
  const {
    value,
    onChange,
    optionArr,
    label,
    isDarkMode
  } = props;

  const theme = isDarkMode ? themeColor.dark : themeColor.light;

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        width: "100%"
      }}
    >
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          padding: "0.5rem",
          marginBottom: "0.5rem",
          backgroundColor: theme.cardBackground,
          color: theme.text,
          border: `1px solid ${theme.border}`,
          borderRadius: "4px",
          appearance: "none",
          WebkitAppearance: "none",
          MozAppearance: "none"
        }}
      >
        <option value="">Select {label}</option>
        {optionArr.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
      <div
        style={{
          cursor: "pointer",
          position: "absolute",
          top: 2,
          right: 10,
          pointerEvents: "none"
        }}
      >
        ⌄
      </div>
    </div>
  );
}
