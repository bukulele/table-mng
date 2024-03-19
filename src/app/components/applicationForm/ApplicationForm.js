import React, { useState, useRef } from "react";
import styles from "./applicationForm.module.css";
import Button from "../button/Button";

function ApplicationForm() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    date_of_birth: new Date(),
    phone_number: "",
    email: "",
    street_number: "",
    street_name: "",
    apt_number: "",
    city: "",
    province: "",
    postal_code: "",
    highest_education_level: "",
    school_name: "",
    school_location: "",
    certificates: "",
    social_insurance: "",
    class_1_license_date: new Date(),
    available_start_date: new Date(),
    eligible_enter_usa: false,
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

  const getCodeOnEmail = () => {
    console.log("get email code");
  };

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
  // CHECK DATES TIMEZONES
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.inputContainer}>
        <label htmlFor={"email"}>Email</label>
        <input
          name={"email"}
          type={"email"}
          value={formData.email}
          onChange={handleChangeText}
        />
        <Button
          content={"Get code"}
          style={"classicButton"}
          fn={getCodeOnEmail}
        />
      </div>
      <div className={styles.formHeader}>Contact Details:</div>
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
      <div className={styles.formHeader}>Address (as on Driver's license):</div>
      <div className={styles.inputContainer}>
        <label htmlFor={"street_number"}>Street Number</label>
        <input
          name={"street_number"}
          type={"number"}
          value={formData.street_number}
          onChange={handleChangeText}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor={"street_name"}>Street Name</label>
        <input
          name={"street_name"}
          type={"text"}
          value={formData.street_name}
          onChange={handleChangeText}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor={"apt_number"}>Apt/Unit or Suite #</label>
        <input
          name={"apt_number"}
          type={"number"}
          value={formData.apt_number}
          onChange={handleChangeText}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor={"city"}>City</label>
        <input
          name={"city"}
          type={"text"}
          value={formData.city}
          onChange={handleChangeText}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor={"province"}>Province</label>
        <input
          name={"province"}
          type={"text"}
          value={formData.province}
          onChange={handleChangeText}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor={"postal_code"}>Postal Code</label>
        <input
          name={"postal_code"}
          type={"text"}
          value={formData.postal_code}
          onChange={handleChangeText}
        />
      </div>
      <div className={styles.formHeader}>Education</div>
      <div className={styles.inputContainer}>
        <label htmlFor={"highest_education_level"}>
          Highest Education Level
        </label>
        <input
          name={"highest_education_level"}
          type={"text"}
          value={formData.highest_education_level}
          onChange={handleChangeText}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor={"school_name"}>Name of School/College/University</label>
        <input
          name={"school_name"}
          type={"text"}
          value={formData.school_name}
          onChange={handleChangeText}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor={"school_location"}>Location</label>
        <input
          name={"school_location"}
          type={"text"}
          value={formData.school_location}
          onChange={handleChangeText}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor={"certificates"}>
          Certificates or additional training
        </label>
        <input
          name={"certificates"}
          type={"text"}
          value={formData.certificates}
          onChange={handleChangeText}
        />
      </div>
      <div className={styles.formHeader}>Employment Record</div>
      <div className={styles.inputContainer}>
        <label htmlFor={"social_insurance"}>
          Social Insurance Number (visible for Payroll Department only)
        </label>
        <input
          name={"social_insurance"}
          type={"number"}
          value={formData.social_insurance}
          onChange={handleChangeText}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor={"class_1_license_date"}>
          Issue date of first Class 1 license
        </label>
        <input
          name={"class_1_license_date"}
          type={"date"}
          value={formData.class_1_license_date}
          onChange={handleChangeText}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor={"available_start_date"}>Date available to start</label>
        <input
          name={"available_start_date"}
          type={"date"}
          value={formData.available_start_date}
          onChange={handleChangeText}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor={"eligible_enter_usa"}>Eligible to enter USA?</label>
        <input
          name={"eligible_enter_usa"}
          type={"text"}
          value={formData.eligible_enter_usa}
          onChange={handleChangeText}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor={"routes"}>Preferred Routes</label>
        <input
          name={"routes"}
          type={"text"}
          value={formData.routes}
          onChange={handleChangeText}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor={"logbooks"}>Logbooks from previous employer</label>
        <input
          name={"logbooks"}
          type={"file"}
          value={formData.logbooks}
          onChange={handleChangeText}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor={"accidents_history"}>
          Accidents History - Past 3 years
        </label>
        <textarea
          name={"accidents_history"}
          type={"file"}
          value={formData.accidents_history}
          onChange={handleChangeText}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor={"traffic_convictions"}>
          Traffic Convictions and Forfeitures (Past 3 Years)
        </label>
        <textarea
          name={"traffic_convictions"}
          type={"file"}
          value={formData.traffic_convictions}
          onChange={handleChangeText}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor={"license_denied"}>
          Have you ever been denied a license
        </label>
        <input
          name={"license_denied"}
          type={"text"}
          value={formData.license_denied}
          onChange={handleChangeText}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor={"license_denied_reason"}>
          Reason for license denial
        </label>
        <input
          name={"license_denied_reason"}
          type={"text"}
          value={formData.license_denied_reason}
          onChange={handleChangeText}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor={"license_suspended"}>
          Has your license ever been suspended or revoked
        </label>
        <input
          name={"license_suspended"}
          type={"text"}
          value={formData.license_suspended}
          onChange={handleChangeText}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor={"license_suspended_reason"}>
          Reason for license denial
        </label>
        <input
          name={"license_suspended_reason"}
          type={"text"}
          value={formData.license_suspended_reason}
          onChange={handleChangeText}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor={"abstract"}>Abstract (not older than 30 days)</label>
        <input
          name={"abstract"}
          type={"text"}
          value={formData.abstract}
          onChange={handleChangeText}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor={"license_scan"}>
          Driver's license scan on both sides
        </label>
        <input
          name={"license_scan"}
          type={"text"}
          value={formData.license_scan}
          onChange={handleChangeText}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor={"passport_scan"}>Passport / US Visa scan</label>
        <input
          name={"passport_scan"}
          type={"text"}
          value={formData.passport_scan}
          onChange={handleChangeText}
        />
      </div>
      <input type="submit" value={"Submit Application Form"} />
    </form>
  );
}

export default ApplicationForm;
