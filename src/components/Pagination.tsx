import React from "react";
import {themeColor} from "../utils/constants";

interface PaginationProps
{
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isDarkMode: boolean;
}

export default function Pagination(props: PaginationProps)
{
  const {
    currentPage,
    totalPages,
    onPageChange,
    isDarkMode
  } = props;

  const theme = isDarkMode ? themeColor.dark : themeColor.light;

  const buttonStyle = {
    padding: "0.5rem 1rem",
    margin: "0 0.25rem",
    backgroundColor: theme.button,
    color: theme.buttonText,
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    ":disabled": {
      opacity: 0.5,
      cursor: "not-allowed"
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem",
        backgroundColor: theme.background,
        color: theme.text
      }}
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={buttonStyle}
      >
        Previous
      </button>

      <span
        style={{margin: "0 1rem"}}
      >
        {currentPage} / {totalPages}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={buttonStyle}
      >
        Next
      </button>
    </div>
  );
}

