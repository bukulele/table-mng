import React, { useState } from "react";
import styles from "./applicationForm.module.css";

function ApplicationForm() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    date_of_birth: new Date(),
    phone_number: "",
    email: "",
    routes: "",
    criminal_record_check_scan: new File([], ""),
    criminal_record_check_expiration_date: new Date(),
    pre_employment_road_test_scan: new File([], ""),
    pre_employment_road_test_date: new Date(),
    consent_to_personal_investigation: new File([], ""),
  });

  const handleChangeText = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleFileChange = (event) => {
    const name = event.target.name;
    const file = event.target.files[0];
    setFormData((prevFormData) => ({ ...prevFormData, [name]: file }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const data = new FormData();
    // Append text fields
    Object.entries(formData).forEach(([key, value]) => {
      if (typeof value !== "object") {
        data.append(key, value);
      }
    });

    // Append file fields
    for (const [key, value] of Object.entries(formData)) {
      if (value instanceof File) {
        data.append(key, value);
      }
    }

    fetch("/api/submit-form", {
      method: "POST",
      body: data,
    })
      // .then((data) => {
      //   return data.json();
      // })
      .then((data) => console.log(data));
  };

  // ADD ACCEPTABLE FILE TYPES!!!
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.inputContainer}>
        <label htmlFor={"first_name"}>First Name</label>
        <input
          name={"first_name"}
          type={"text"}
          value={formData.first_name}
          onChange={handleChangeText}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor={"last_name"}>Last Name</label>
        <input
          name={"last_name"}
          type={"text"}
          value={formData.last_name}
          onChange={handleChangeText}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor={"date_of_birth"}>Date of Birth</label>
        <input
          name={"date_of_birth"}
          type={"date"}
          value={formData.date_of_birth}
          onChange={handleChangeText}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor={"phone_number"}>Phone Number</label>
        <input
          name={"phone_number"}
          type={"tel"}
          value={formData.phone_number}
          onChange={handleChangeText}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor={"email"}>Email</label>
        <input
          name={"email"}
          type={"email"}
          value={formData.email}
          onChange={handleChangeText}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor={"routes"}>Routes</label>
        <input
          name={"routes"}
          type={"text"}
          value={formData.routes}
          onChange={handleChangeText}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor={"criminal_record_check_scan"}>
          Criminal Record Check Scan
        </label>
        <input
          name={"criminal_record_check_scan"}
          type={"file"}
          onChange={handleFileChange}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor={"criminal_record_check_expiration_date"}>
          Criminal Record Check Expiration Date
        </label>
        <input
          name={"criminal_record_check_expiration_date"}
          type={"date"}
          value={formData.criminal_record_check_expiration_date}
          onChange={handleChangeText}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor={"pre_employment_road_test_scan"}>
          Pre-employment Road Test Scan
        </label>
        <input
          name={"pre_employment_road_test_scan"}
          type={"file"}
          onChange={handleFileChange}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor={"pre_employment_road_test_date"}>
          Pre-employment Road Test Date
        </label>
        <input
          name={"pre_employment_road_test_date"}
          type={"date"}
          value={formData.pre_employment_road_test_date}
          onChange={handleChangeText}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor={"consent_to_personal_investigation"}>
          Consent to Personal Investigation
        </label>
        <input
          name={"consent_to_personal_investigation"}
          type={"file"}
          onChange={handleFileChange}
        />
      </div>
      <input type="submit" value={"Submit Application Form"} />
    </form>
  );
}

export default ApplicationForm;
