import React, { useState, useRef, useEffect } from "react";
import styles from "./applicationForm.module.css";
import Button from "../button/Button";
import EmploymentHistory from "./EmploymentHistory";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
// import sanitizeData from "@/app/functions/sanitizeData";
import checkNumericInput from "@/app/functions/checkNumericInput";
import NumericInput from "./NumericInput";
import TextInput from "./TextInput";
import DateInput from "./DateInput";
import TextareaInput from "./TextareaInput";
import PhoneNumberInput from "./PhoneNumberInput";

function ApplicationForm({ userData }) {
  const userId = userData.id;
  const EMPLOYMENT_HISTORY_TEMPLATE = {
    employer_name: "",
    job_title: "",
    start_date: new Date(),
    end_date: new Date(),
    reason_for_leaving: "",
    employer_contact_email: "",
  };
  const FORM_TEMPLATE = {
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
    logbooks: null,
    consent_to_personal_investigation: null,
    accidents_history: "",
    traffic_convictions: "",
    denied_license: false,
    denied_license_reason: "",
    license_suspended_or_revoked: false,
    license_suspended_reason: "",
    abstract: null,
    license_scan: null,
    passport_scan: null,
    employment_history: [EMPLOYMENT_HISTORY_TEMPLATE],
  };

  const [formData, setFormData] = useState(FORM_TEMPLATE);

  const logbooksRef = useRef(null);
  const abstractRef = useRef(null);
  const licenseScanRef = useRef(null);
  const passportScanRef = useRef(null);

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
    uploadFile(name);
  };

  const uploadFile = (name) => {
    const data = new FormData();

    let url = "https://portal.4tracksltd.com/api/drivers/";

    if (name === "logbooks") {
      // url +=
    }

    if (name === "abstract") {
      url += `driver_abstracts/`;
      data.append("scan", abstractRef.current.files[0]);
    }

    if (name === "license_scan") {
      url += `driver_licenses/`;
      data.append("scan", licenseScanRef.current.files[0]);
    }

    if (name === "passport_scan") {
      // url +=
    }

    data.append("driver", userId);
    data.append("issue_date", "2024-03-25");

    fetch(url, {
      method: "POST",
      body: data,
    })
      .then((response) => {
        console.log(response);
        if (response.ok) {
        } else {
          console.error("Error submitting form");
        }
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
      });
  };

  const handleEmploymentHistory = (event, idx) => {
    const { name, value } = event.target;
    let employmentHistoryData = [...formData.employment_history];
    employmentHistoryData[idx][name] = value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      employment_history: [...employmentHistoryData],
    }));
  };

  const addEmploymentHistoryBlock = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      employment_history: [
        ...formData.employment_history,
        EMPLOYMENT_HISTORY_TEMPLATE,
      ],
    }));
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
    if (logbooksRef.current.files.length > 0) {
      data.append("log_books_history", logbooksRef.current.files[0]);
    }
    if (abstractRef.current.files.length > 0) {
      // data.append("files", abstractRef.current.files[0]);
    }
    if (licenseScanRef.current.files.length > 0) {
      // data.append("files", licenseScanRef.current.files[0]);
    }
    if (passportScanRef.current.files.length > 0) {
      data.append("files", passportScanRef.current.files[0]);
    }

    fetch(`https://portal.4tracksltd.com/api/drivers/drivers/${userId}/`, {
      method: "PUT",
      body: data,
    })
      .then((response) => {
        console.log(response);
        if (response.ok) {
          // SHOW TO DRIVER THAT SAVED SUCCESSFULLY
        } else {
          console.error("Error submitting form");
        }
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
      });
  };

  useEffect(() => {
    if (!userData) return;

    for (let key in FORM_TEMPLATE) {
      if (userData[key]) {
        if (
          (key === "routes" || key === "employment_history") &&
          userData[key].length > 0
        ) {
          setFormData((prevData) => ({
            ...prevData,
            [key]: [...userData[key]],
          }));
        } else if (key !== "routes" && key !== "employment_history") {
          setFormData((prevData) => ({
            ...prevData,
            [key]: userData[key],
          }));
        }
      }
    }
  }, []);

  // ADD ACCEPTABLE FILE TYPES!!!
  // CHECK DATES TIMEZONES
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.inputContainer}>
        <label htmlFor={"email"}>Email</label>
        <input name={"email"} type={"email"} value={formData.email} disabled />
      </div>
      <div className={styles.formHeader}>Contact Details:</div>
      <TextInput
        name={"first_name"}
        label={"First Name"}
        value={formData.first_name}
        updateState={setFormData}
      />
      <TextInput
        name={"last_name"}
        label={"Last Name"}
        value={formData.last_name}
        updateState={setFormData}
      />
      <DateInput
        name={"date_of_birth"}
        label={"Date of Birth"}
        value={formData.date_of_birth}
        updateState={setFormData}
      />
      <PhoneNumberInput
        name={"phone_number"}
        label={"Phone Number"}
        placeholder="+1 XXX XXX XXXX"
        value={formData.phone_number}
        updateState={setFormData}
      />
      <div className={styles.formHeader}>
        {"Address (as on Driver's license):"}
      </div>
      <NumericInput
        name={"street_number"}
        label={"Street Number"}
        value={formData.street_number}
        updateState={setFormData}
      />
      <TextInput
        name={"street"}
        label={"Street Name"}
        value={formData.street}
        updateState={setFormData}
      />
      <TextInput
        name={"unit_or_suite"}
        label={"Apt/Unit or Suite #"}
        value={formData.unit_or_suite}
        updateState={setFormData}
      />
      <TextInput
        name={"city"}
        label={"City"}
        value={formData.city}
        updateState={setFormData}
      />
      <TextInput
        name={"province"}
        label={"Province"}
        value={formData.province}
        updateState={setFormData}
      />
      <TextInput
        name={"postal_code"}
        label={"Postal Code"}
        value={formData.postal_code}
        updateState={setFormData}
      />
      <div className={styles.formHeader}>Education</div>
      <TextInput
        name={"highest_level_of_education"}
        label={"Highest Education Level"}
        value={formData.highest_level_of_education}
        updateState={setFormData}
      />
      <TextInput
        name={"name_of_school"}
        label={"Name of School/College/University"}
        value={formData.name_of_school}
        updateState={setFormData}
      />
      <TextInput
        name={"school_location"}
        label={"Location"}
        value={formData.school_location}
        updateState={setFormData}
      />
      <TextInput
        name={"certificates_additional_training"}
        label={"Certificates or additional training"}
        value={formData.certificates_additional_training}
        updateState={setFormData}
      />
      <div className={styles.formHeader}>Employment Record</div>
      <TextInput
        name={"social_insurance_number"}
        label={"Social Insurance Number (visible for Payroll Department only)"}
        value={formData.social_insurance_number}
        updateState={setFormData}
      />
      <TextInput
        name={"class1_date"}
        label={"Issue date of first Class 1 license"}
        value={formData.class1_date}
        updateState={setFormData}
      />
      <NumericInput
        name={"miles_driven_total"}
        label={"Class 1 Miles Driven Total"}
        value={formData.miles_driven_total}
        updateState={setFormData}
      />
      <DateInput
        name={"date_available"}
        label={"Date available to start"}
        value={formData.date_available}
        updateState={setFormData}
      />
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
      <div className={styles.formHeader}>Employment History</div>
      <div className={styles.formHeaderMenu}>
        <p>Add Position</p>
        <Button
          content={<FontAwesomeIcon icon={faPlus} size="2x" />}
          style={"iconButton"}
          fn={addEmploymentHistoryBlock}
        />
      </div>
      {formData.employment_history.map((item, idx) => {
        return (
          <EmploymentHistory
            key={`employmentHistory_${idx}`}
            idx={idx}
            employer_name={item.employer_name}
            job_title={item.job_title}
            start_date={item.start_date}
            end_date={item.end_date}
            reason_for_leaving={item.reason_for_leaving}
            employer_contact_email={item.employer_contact_email}
            handleEmploymentHistory={handleEmploymentHistory}
          />
        );
      })}
      <div className={styles.inputContainer}>
        <label htmlFor={"log_books_history"}>
          Logbooks from previous employer
        </label>
        <input
          ref={logbooksRef}
          name={"log_books_history"}
          type={"file"}
          onChange={handleFileChange}
        />
      </div>
      <TextareaInput
        name={"accidents_history"}
        label={"Accidents History (Past 3 years)"}
        value={formData.accidents_history}
        updateState={setFormData}
      />
      <TextareaInput
        name={"traffic_convictions"}
        label={"Traffic Convictions and Forfeitures (Past 3 Years)"}
        value={formData.traffic_convictions}
        updateState={setFormData}
      />
      <div className={styles.inputContainer}>
        <p>Have you ever been denied a license?</p>
        <div className={styles.optionsContainer}>
          <div className={styles.optionContainer}>
            <label htmlFor="yesOption">Yes</label>
            <input
              type="radio"
              id="yesOption"
              name="denied_license"
              value="true"
              checked={formData.denied_license === true}
              onChange={handleTrueFalseChange}
            />
          </div>
          <div className={styles.optionContainer}>
            <label htmlFor="noOption">No</label>
            <input
              type="radio"
              id="noOption"
              name="denied_license"
              value="false"
              checked={formData.denied_license === false}
              onChange={handleTrueFalseChange}
            />
          </div>
        </div>
      </div>
      {formData.denied_license && (
        <TextInput
          name={"denied_license_reason"}
          label={"Reason for license denial"}
          value={formData.denied_license_reason}
          updateState={setFormData}
        />
      )}
      <div className={styles.inputContainer}>
        <p>Has your license ever been suspended or revoked</p>
        <div className={styles.optionsContainer}>
          <div className={styles.optionContainer}>
            <label htmlFor="yesOption">Yes</label>
            <input
              type="radio"
              id="yesOption"
              name="license_suspended_or_revoked"
              value="true"
              checked={formData.license_suspended_or_revoked === true}
              onChange={handleTrueFalseChange}
            />
          </div>
          <div className={styles.optionContainer}>
            <label htmlFor="noOption">No</label>
            <input
              type="radio"
              id="noOption"
              name="license_suspended_or_revoked"
              value="false"
              checked={formData.license_suspended_or_revoked === false}
              onChange={handleTrueFalseChange}
            />
          </div>
        </div>
      </div>
      {formData.license_suspended_or_revoked && (
        <TextInput
          name={"license_suspended_reason"}
          label={"Reason for Suspension or Revocation:"}
          value={formData.license_suspended_reason}
          updateState={setFormData}
        />
      )}
      <div className={styles.inputContainer}>
        <label htmlFor={"abstract"}>Abstract (not older than 30 days)</label>
        <input
          ref={abstractRef}
          name={"abstract"}
          type={"file"}
          onChange={handleFileChange}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor={"license_scan"}>
          {"Driver's license scan on both sides"}
        </label>
        <input
          ref={licenseScanRef}
          name={"license_scan"}
          type={"file"}
          onChange={handleFileChange}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor={"passport_scan"}>Passport / US Visa scan</label>
        <input
          ref={passportScanRef}
          name={"passport_scan"}
          type={"file"}
          onChange={handleFileChange}
        />
      </div>
      <input type="submit" value={"Submit Application Form"} />
    </form>
  );
}

export default ApplicationForm;
