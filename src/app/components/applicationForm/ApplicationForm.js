import React, { useState, useRef } from "react";
import styles from "./applicationForm.module.css";

function ApplicationForm() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    date_of_birth: new Date(),
    phone_number: "",
    email: "",
    routes: "",
    criminal_record_check_scan: null,
    criminal_record_check_expiration_date: new Date(),
    pre_employment_road_test_scan: null,
    pre_employment_road_test_date: new Date(),
    consent_to_personal_investigation: null,
  });

  const criminalRecordCheckScanRef = useRef(null);
  const preEmploymentRoadTestScanRef = useRef(null);
  const consentToPersonalInvestigationRef = useRef(null);

  const handleChangeText = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: files[0] }));
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
    if (criminalRecordCheckScanRef.current.files.length > 0) {
      data.append("files", criminalRecordCheckScanRef.current.files[0]);
    }
    if (preEmploymentRoadTestScanRef.current.files.length > 0) {
      data.append("files", preEmploymentRoadTestScanRef.current.files[0]);
    }
    if (consentToPersonalInvestigationRef.current.files.length > 0) {
      data.append("files", consentToPersonalInvestigationRef.current.files[0]);
    }

    fetch("/api/submit-form", {
      method: "POST",
      body: data,
    })
      .then((response) => {
        if (response.ok) {
          // Reset form data
          setFormData({
            first_name: "",
            last_name: "",
            date_of_birth: new Date(),
            phone_number: "",
            email: "",
            routes: "",
            criminal_record_check_scan: null,
            criminal_record_check_expiration_date: new Date(),
            pre_employment_road_test_scan: null,
            pre_employment_road_test_date: new Date(),
            consent_to_personal_investigation: null,
          });
          // Reset file inputs
          criminalRecordCheckScanRef.current.value = null;
          preEmploymentRoadTestScanRef.current.value = null;
          consentToPersonalInvestigationRef.current.value = null;
        } else {
          console.error("Error submitting form");
        }
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
      });
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
          name="criminal_record_check_scan"
          type="file"
          onChange={handleFileChange}
          ref={criminalRecordCheckScanRef}
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
          name="pre_employment_road_test_scan"
          type="file"
          onChange={handleFileChange}
          ref={preEmploymentRoadTestScanRef}
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
          name="consent_to_personal_investigation"
          type="file"
          onChange={handleFileChange}
          ref={consentToPersonalInvestigationRef}
        />
      </div>
      <input type="submit" value={"Submit Application Form"} />
    </form>
  );
}

export default ApplicationForm;
