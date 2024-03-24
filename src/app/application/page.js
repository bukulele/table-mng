"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import ApplicationForm from "../components/applicationForm/ApplicationForm";
import ApplicationEnterWindow from "../components/applicationEnterWindow/ApplicationEnterWindow";

function Application() {
  const [userData, setUserData] = useState(null);

  return (
    <div className={styles.main}>
      {userData ? (
        <ApplicationForm userData={userData} />
      ) : (
        <ApplicationEnterWindow setUserData={setUserData} />
      )}
    </div>
  );
}

export default Application;
