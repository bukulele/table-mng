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
    street: "",
    unit_or_suite: "",
    city: "",
    province: "",
    postal_code: "",
    highest_level_of_education: "",
    name_of_school: "",
    school_location: "",
    certificates_additional_training: "",
    social_insurance_number: "",
    class1_date: new Date(),
    miles_driven_total: "",
    date_available: new Date(),
    eligible_to_enter_usa: false,
    routes: [],
    criminal_record_check_scan: null,
    criminal_record_check_expiration_date: new Date(),
    pre_employment_road_test_scan: null,
    pre_employment_road_test_date: new Date(),
    consent_to_personal_investigation: null,
    accidents_history: "",
    traffic_convictions: "",
    denied_license: "",
    denied_license_reason: "",
    license_suspended_or_revoked: "",
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

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: formattedNumber,
    }));
  };

  const handleChangeNumber = (event) => {
    const { name, value, selectionStart, selectionEnd } = event.target;
    const oldValue = event.target.defaultValue;
    const nonDigits = /\D+/g;

    // Check if the new value is numeric or if it's a control action (backspace, delete, arrow keys)
    // This is simplified; for more complex scenarios, additional checks may be necessary
    if (!nonDigits.test(value) || value === "") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    } else {
      // Revert to the old value if non-numeric input is detected
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: oldValue,
      }));

      // This timeout ensures the cursor position is updated after React re-renders the component
      setTimeout(() => {
        event.target.setSelectionRange(selectionStart - 1, selectionEnd - 1);
      }, 0);
    }
  };

  const handleTrueFalseChange = (event) => {
    const { name } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: event.target.value === "true",
    }));
  };

  const handleRoutesChange = (event) => {
    const value = Number(event.target.value);
    const isChecked = event.target.checked;

    if (isChecked) {
      // Add the value to the array if checked
      setFormData((prevFormData) => ({
        ...prevFormData,
        routes: [...prevFormData.routes, value],
      }));
    } else {
      // Remove the value from the array if unchecked
      setFormData((prevFormData) => ({
        ...prevFormData,
        routes: prevFormData.routes.filter((item) => item !== value),
      }));
    }
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
          type={"text"}
          placeholder="+1 XXX XXX XXXX"
          value={formData.phone_number}
          onChange={handlePhoneNumberChange}
        />
      </div>
      <div className={styles.formHeader}>Address (as on Driver's license):</div>
      <div className={styles.inputContainer}>
        <label htmlFor={"street_number"}>Street Number</label>
        <input
          name={"street_number"}
          type={"text"}
          value={formData.street_number}
          onChange={handleChangeNumber}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor={"street"}>Street Name</label>
        <input
          name={"street"}
          type={"text"}
          value={formData.street}
          onChange={handleChangeText}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor={"unit_or_suite"}>Apt/Unit or Suite #</label>
        <input
          name={"unit_or_suite"}
          type={"text"}
          value={formData.unit_or_suite}
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
        <label htmlFor={"highest_level_of_education"}>
          Highest Education Level
        </label>
        <input
          name={"highest_level_of_education"}
          type={"text"}
          value={formData.highest_level_of_education}
          onChange={handleChangeText}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor={"name_of_school"}>
          Name of School/College/University
        </label>
        <input
          name={"name_of_school"}
          type={"text"}
          value={formData.name_of_school}
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
        <label htmlFor={"certificates_additional_training"}>
          Certificates or additional training
        </label>
        <input
          name={"certificates_additional_training"}
          type={"text"}
          value={formData.certificates_additional_training}
          onChange={handleChangeText}
        />
      </div>
      <div className={styles.formHeader}>Employment Record</div>
      <div className={styles.inputContainer}>
        <label htmlFor={"social_insurance_number"}>
          Social Insurance Number (visible for Payroll Department only)
        </label>
        <input
          name={"social_insurance_number"}
          type={"text"}
          value={formData.social_insurance_number}
          onChange={handleChangeText}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor={"class1_date"}>
          Issue date of first Class 1 license
        </label>
        <input
          name={"class1_date"}
          type={"date"}
          value={formData.class1_date}
          onChange={handleChangeText}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor={"miles_driven_total"}>Class 1 Miles Driven Total</label>
        <input
          name={"miles_driven_total"}
          type={"text"}
          value={formData.miles_driven_total}
          onChange={handleChangeNumber}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor={"date_available"}>Date available to start</label>
        <input
          name={"date_available"}
          type={"date"}
          value={formData.date_available}
          onChange={handleChangeText}
        />
      </div>
      <div className={styles.inputContainer}>
        <p>Eligible to enter USA?</p>
        <div className={styles.optionsContainer}>
          <div className={styles.optionContainer}>
            <label htmlFor="yesOption">Yes</label>
            <input
              type="radio"
              id="yesOption"
              name="eligible_to_enter_usa"
              value="true"
              checked={formData.eligible_to_enter_usa === true}
              onChange={handleTrueFalseChange}
            />
          </div>
          <div className={styles.optionContainer}>
            <label htmlFor="noOption">No</label>
            <input
              type="radio"
              id="noOption"
              name="eligible_to_enter_usa"
              value="false"
              checked={formData.eligible_to_enter_usa === false}
              onChange={handleTrueFalseChange}
            />
          </div>
        </div>
      </div>
      <div className={styles.inputContainer}>
        <p>Preferred Routes</p>
        <div className={styles.optionsContainer}>
          <div className={styles.optionContainer}>
            <input
              type="checkbox"
              id="option1"
              value="1"
              checked={formData.routes.includes(1)}
              onChange={handleRoutesChange}
            />
            <label htmlFor="option1">CA HWY</label>
          </div>
          <div className={styles.optionContainer}>
            <input
              type="checkbox"
              id="option2"
              value="2"
              checked={formData.routes.includes(2)}
              onChange={handleRoutesChange}
            />
            <label htmlFor="option2">USA</label>
          </div>
          <div className={styles.optionContainer}>
            <input
              type="checkbox"
              id="option3"
              value="3"
              checked={formData.routes.includes(3)}
              onChange={handleRoutesChange}
            />
            <label htmlFor="option3">City</label>
          </div>
        </div>
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
        <label htmlFor={"denied_license"}>
          Have you ever been denied a license
        </label>
        <input
          name={"denied_license"}
          type={"text"}
          value={formData.denied_license}
          onChange={handleChangeText}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor={"denied_license_reason"}>
          Reason for license denial
        </label>
        <input
          name={"denied_license_reason"}
          type={"text"}
          value={formData.denied_license_reason}
          onChange={handleChangeText}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor={"license_suspended_or_revoked"}>
          Has your license ever been suspended or revoked
        </label>
        <input
          name={"license_suspended_or_revoked"}
          type={"text"}
          value={formData.license_suspended_or_revoked}
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
