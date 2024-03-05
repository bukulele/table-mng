import React from "react";
import styles from "./menu.module.css";
import Button from "../button/Button";

function Menu({ menuClick }) {
  return (
    <div className={styles.menu}>
      <Button content={"Applications"} style={"menuPoint"} fn={menuClick} />
      <Button content={"Drivers"} style={"menuPoint"} fn={menuClick} />
      <Button content={"Trucks"} style={"menuPoint"} fn={menuClick} />
    </div>
  );
}

export default Menu;
