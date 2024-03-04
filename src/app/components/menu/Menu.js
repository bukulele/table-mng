import React from "react";
import styles from "./menu.module.css";

function Menu() {
  return (
    <div className={styles.menu}>
      <ul>
        <li>Applications</li>
        <li>Drivers</li>
        <li>Trucks</li>
      </ul>
    </div>
  );
}

export default Menu;
