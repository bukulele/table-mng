import React from "react";
import styles from "./tableLine.module.css";

function TableLine({ isFirst, isLast, treeXLevel, children }) {
  return (
    <>
      <div
        style={{
          zIndex: 1,
          display: "inline-block",
          width: "9px",
          height: "40px",
          pointerEvents: "none",
        }}
      >
        <div
          className="line"
          style={{
            position: "absolute",
            top: isFirst ? "20px" : "0",
            left: `${19 + treeXLevel * 20}px`,
            width: "1px",
            height: isLast ? "20px" : "40px",
          }}
        />
        <div
          className="line"
          style={{
            position: "absolute",
            top: "20px",
            left: `${19 + treeXLevel * 20}px`,
            width: "18px",
            height: "1px",
          }}
        />
      </div>

      <span
        style={{
          display: "flex",
          alignItems: "center",
          minWidth: 0,
        }}
      >
        <span
          style={{
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          {children}
        </span>
      </span>
    </>
  );
}

export default TableLine;
