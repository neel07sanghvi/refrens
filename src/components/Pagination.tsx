import {CSSProperties} from "react";
import React, {ReactNode} from "react";
import {useWindowSize} from "../hooks/useWindowSize";
import {themeColor} from "../utils/constants";

interface IPaginationProps
{
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isDarkMode: boolean;
}

export default function Pagination(props: IPaginationProps)
{
  const {
    currentPage,
    totalPages,
    onPageChange,
    isDarkMode
  } = props;

  const theme = isDarkMode ? themeColor.dark : themeColor.light;
  const {isMobile} = useWindowSize();

  const buttonStyle: CSSProperties = {
    padding: isMobile ? "0.3rem 0.6rem" : "0.5rem 1rem",
    margin: isMobile ? "0.1rem" : "0 0.25rem",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: isMobile ? "0.8rem" : "1rem"
  };

  const activeButtonStyle: CSSProperties = {
    ...buttonStyle,
    border: `2px solid ${theme.buttonActiveBorder}`
  };

  const disabledButtonStyle: CSSProperties = {
    ...buttonStyle,
    cursor: "not-allowed"
  };

  const getPageNumbers = (): (ReactNode | number)[] =>
  {
    const pageNumbers = [] as (ReactNode | number)[];
    const ellipsis: ReactNode = (
      <span
        key="ellipsis"
        style={{
          margin: "0 0.5rem",
          display: "flex",
          alignItems: "center"
        }}
      >
        ...
      </span>
    );

    if(totalPages <= (isMobile ? 5 : 7))
    {
      for(let i = 1; i <= totalPages; i++)
      {
        pageNumbers.push(i);
      }
    }
    else
    {
      pageNumbers.push(1);
      if(currentPage > (isMobile ? 2 : 3))
      {
        pageNumbers.push(ellipsis);
      }
      const start = Math.max(2, currentPage - (isMobile ? 0 : 1));
      const end = Math.min(totalPages - 1, currentPage + (isMobile ? 0 : 1));
      for(let i = start; i <= end; i++)
      {
        pageNumbers.push(i);
      }
      if(currentPage < totalPages - (isMobile ? 1 : 2))
      {
        pageNumbers.push(ellipsis);
      }
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: isMobile ? "0.5rem" : "1rem",
        backgroundColor: theme.background,
        color: theme.text,
        flexWrap: "wrap"
      }}
    >
      <div
        style={{
          border: `1px solid ${theme.cardBackground}`,
          borderRadius: "4px",
          padding: "4px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly"
        }}
      >
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          style={currentPage === 1 ? disabledButtonStyle : buttonStyle}
        >
          {"< Prev"}
        </button>

        {getPageNumbers().map((pageNum, index) => (
          typeof pageNum === "number"
            ? (
              <button
                key={index}
                onClick={() => onPageChange(pageNum as number)}
                style={pageNum === currentPage ? activeButtonStyle : buttonStyle}
              >
                {pageNum}
              </button>
            )
            : pageNum
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={currentPage === totalPages ? disabledButtonStyle : buttonStyle}
        >
          {"Next >"}
        </button>
      </div>
    </div>
  );
}
