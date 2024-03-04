"use client";

import styles from "./page.module.css";
import testDrivers from "../../public/testData/testDrivers.json";
import Menu from "./components/menu/Menu";
import { useState, useEffect } from "react";
import TableContainer from "./components/tableContainer/TableContainer";

export default function Home() {
  const [dataLoaded, setDataLoaded] = useState(null);

  useEffect(() => {
    setDataLoaded(testDrivers);
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.appContainer}>
        <Menu />
        <TableContainer data={dataLoaded} />
      </div>
    </main>
  );
}
