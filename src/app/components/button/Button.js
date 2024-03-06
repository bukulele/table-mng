import React from "react";
import styles from "./button.module.css";

function Button({ content, style, fn, highlighted }) {
  const classHighlighted = highlighted ? style + "-highlighted" : "";

  const handleClick = () => {
    fn(content);
  };

  return (
    <div
      className={`${styles[style]} ${styles[classHighlighted]}`}
      onClick={handleClick}
    >
      {content}
    </div>
  );
}

export default Button;
