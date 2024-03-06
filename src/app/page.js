"use client";

import styles from "./page.module.css";
import testDrivers from "../../public/testData/drivers.json";
import Menu from "./components/menu/Menu";
import { useState, useEffect } from "react";
import TableContainer from "./components/tableContainer/TableContainer";

export default function Home() {
  const [dataLoaded, setDataLoaded] = useState(null);
  const [menuPointChosen, setMenuPointChosen] = useState("");

  const handleMenuClick = (data) => {
    setMenuPointChosen(data);
  };

  useEffect(() => {
    if (menuPointChosen === "Drivers") {
      setDataLoaded(testDrivers);
    } else {
      setDataLoaded(null);
    }
  }, [menuPointChosen]);

  return (
    <main className={styles.main}>
      <div className={styles.appContainer}>
        <Menu menuClick={handleMenuClick} menuPointChosen={menuPointChosen} />
        {dataLoaded ? (
          <TableContainer data={dataLoaded} />
        ) : (
          <div className={styles.noData}>NO DATA</div>
        )}
      </div>
    </main>
  );
}
