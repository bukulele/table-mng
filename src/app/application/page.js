"use client";

import React from "react";
import styles from "./page.module.css";
import ApplicationForm from "../components/applicationForm/ApplicationForm";

function Application() {
  return (
    <div className={styles.main}>
      <ApplicationForm />
    </div>
  );
}

export default Application;
