import React from "react";
import styles from "./applicationForm.module.css";

function EmploymentHistory({
  employer_name,
  job_title,
  start_date,
  end_date,
  reason_for_leaving,
  email,
  handleChangeText,
}) {
  return (
    <>
      <div className={styles.inputContainer}>
        <label htmlFor={"employer_name"}>Employer Name</label>
        <input
          name={"employer_name"}
          type={"text"}
          value={employer_name}
          onChange={handleChangeText}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor={"job_title"}>Job Title</label>
        <input
          name={"job_title"}
          type={"text"}
          value={job_title}
          onChange={handleChangeText}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor={"start_date"}>Start Date</label>
        <input
          name={"start_date"}
          type={"date"}
          value={start_date}
          onChange={handleChangeText}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor={"end_date"}>End Date</label>
        <input
          name={"end_date"}
          type={"date"}
          value={end_date}
          onChange={handleChangeText}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor={"reason_for_leaving"}>Reason For Leaving</label>
        <input
          name={"reason_for_leaving"}
          type={"text"}
          value={reason_for_leaving}
          onChange={handleChangeText}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor={"email"}>Employer contact Email</label>
        <input
          name={"email"}
          type={"email"}
          value={email}
          onChange={handleChangeText}
        />
      </div>
    </>
  );
}

export default EmploymentHistory;
