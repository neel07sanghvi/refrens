import React from "react";

interface SearchBarProps
{
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar(props: SearchBarProps)
{
  const {
    value,
    onChange
  } = props;

  return (
    <input
      type="text"
      placeholder="Search characters"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
