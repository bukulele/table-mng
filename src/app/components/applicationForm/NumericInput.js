import React from "react";
import styles from "./applicationForm.module.css";
import checkNumericInput from "@/app/functions/checkNumericInput";

function NumericInput({ name, label, value, updateState }) {
  const handleChangeNumber = (event) => {
    checkNumericInput(event, updateState);
  };
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={name}>{label}</label>
      <input
        name={name}
        type={"text"}
        value={value}
        onChange={handleChangeNumber}
      />
    </div>
  );
}

export default NumericInput;
