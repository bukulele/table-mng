import React from "react";
import styles from "./tableLine.module.css";

function LineIcon({ children }) {
  return (
    <div
      //   className={styles.line - icon - container}
      style={{
        zIndex: 2,
        width: 24,
        height: 24,
        color: "#5472d3",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        pointerEvents: "none",
      }}
    >
      <div
        style={{ height: "20px", width: "20px", backgroundColor: "#ffffff" }}
      />
      {children}
    </div>
  );
}

export default LineIcon;
