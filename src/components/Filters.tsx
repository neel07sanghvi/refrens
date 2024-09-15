import {CSSProperties} from "react";
import React from "react";
import {TypeGender} from "../types/indexPlus";
import {TypeStatus} from "../types/indexPlus";
import {ICharactersState} from "../types/indexPlus";
import {themeColor} from "../utils/constants";

interface FiltersProps
{
  filters: ICharactersState["filters"];
  onFilterChange: (filters: Partial<ICharactersState["filters"]>) => void;
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

    </div>
  );
}

function DropDown2(props: {
  value?: string,
  onChange: (value?: string) => void,
  optionArr: string[],
})
{
  const {
    value,
    onChange,
    optionArr
  } = props;

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {optionArr.map((option) => (
        <option
          key={option}
          value={option}
        >
          {option}
        </option>
      ))}
    </select>
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

  const selectStyle = {
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
  } as CSSProperties;

  const arrowStyle = {
    position: "absolute",
    right: "10px",
    top: "40%",
    transform: "translateY(-50%)",
    pointerEvents: "none",
    borderLeft: "5px solid transparent",
    borderRight: "5px solid transparent",
    borderTop: `5px solid ${theme.text}`
  } as CSSProperties;

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
        style={selectStyle}
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
