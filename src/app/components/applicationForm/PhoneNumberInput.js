import React from "react";
import styles from "./applicationForm.module.css";

function PhoneNumberInput({ name, label, value, placeholder, updateState }) {
  const handlePhoneNumberChange = (event) => {
    const { name } = event.target;

    let value = event.target.value;

    // Remove all non-digit characters
    const numbers = value.replace(/\D/g, "");

    // Format the string to match +1 XXX XXXXXXX
    let formattedNumber = "";
    if (numbers.length > 0) {
      formattedNumber += "+1 ";
      if (numbers.length > 1) {
        formattedNumber += numbers.substring(1, 4);
        if (numbers.length > 4) {
          formattedNumber += " " + numbers.substring(4, 11);
        }
      }
    }

    updateState((prev) => {
      // If `prev` is not an object, this will simply return the new value.
      // If it is an object, it assumes a function is used to update a specific field within that object.
      return typeof prev === "object" && prev !== null
        ? { ...prev, [name]: formattedNumber }
        : formattedNumber;
    });
  };

  return (
    <div className={styles.inputContainer}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        name={name}
        type={"text"}
        value={value}
        onChange={handlePhoneNumberChange}
        placeholder={placeholder}
      />
    </div>
  );
}

export default PhoneNumberInput;
