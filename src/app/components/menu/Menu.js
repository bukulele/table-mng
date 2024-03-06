import React from "react";
import styles from "./menu.module.css";
import Button from "../button/Button";

function Menu({ menuClick, menuPointChosen }) {
  return (
    <div className={styles.menu}>
      <Button
        highlighted={menuPointChosen === "Applications"}
        content={"Applications"}
        style={"menuPoint"}
        fn={menuClick}
      />
      <Button
        highlighted={menuPointChosen === "Drivers"}
        content={"Drivers"}
        style={"menuPoint"}
        fn={menuClick}
      />
      <Button
        highlighted={menuPointChosen === "Trucks"}
        content={"Trucks"}
        style={"menuPoint"}
        fn={menuClick}
      />
    </div>
  );
}

export default Menu;
