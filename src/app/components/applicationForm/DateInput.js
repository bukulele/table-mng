import React from "react";
import styles from "./applicationForm.module.css";

function DateInput({ name, label, value, placeholder, updateState }) {
  const handleChangeText = (event) => {
    const { name, value } = event.target;
    updateState((prev) => {
      // If `prev` is not an object, this will simply return the new value.
      // If it is an object, it assumes a function is used to update a specific field within that object.
      return typeof prev === "object" && prev !== null
        ? { ...prev, [name]: value }
        : value;
    });
  };

  return (
    <div className={styles.inputContainer}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        name={name}
        type={"date"}
        value={value}
        onChange={handleChangeText}
        placeholder={placeholder}
      />
    </div>
  );
}

export default DateInput;
