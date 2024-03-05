import React from "react";
import styles from "./button.module.css";

function Button({ content, style, fn }) {
  const handleClick = () => {
    fn(content);
  };

  return (
    <div className={styles[style]} onClick={handleClick}>
      {content}
    </div>
  );
}

export default Button;
