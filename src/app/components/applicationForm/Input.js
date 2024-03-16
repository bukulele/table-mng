import React from "react";
import styles from "./applicationForm.module.css";

function Input({ label, register, type }) {
  return (
    <div className={styles.inputContainer}>
      <label>{label}</label>
      <input type={type} {...register(label)} />
    </div>
  );
}

export default Input;
