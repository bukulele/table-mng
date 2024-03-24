"use client";

import React from "react";
import styles from "./page.module.css";
import ApplicationEnterWindow from "../components/applicationEnterWindow/ApplicationEnterWindow";

function Application() {
  return (
    <div className={styles.main}>
      <ApplicationEnterWindow />
    </div>
  );
}

export default Application;
