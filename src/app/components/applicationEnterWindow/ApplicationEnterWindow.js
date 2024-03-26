import React, { useEffect, useState } from "react";
import styles from "./applicationEnterForm.module.css";
import checkNumericInput from "@/app/functions/checkNumericInput";
import Button from "../button/Button";

function ApplicationEnterWindow({ setUserData }) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userExists, setUserExists] = useState(null);
  const [showEnterVerificationCode, setShowEnterVerificationCode] =
    useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [diverId, setDriverId] = useState(0);
  const [dataStored, setDataStored] = useState(false);

  // Function to handle the initial email check
  const checkEmail = () => {
    fetch("https://portal.4tracksltd.com/api/drivers/check_email/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data.exists) {
          sendCode(data.driver_id);
        } else {
          setUserExists(false);
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  // Function to handle submission of all user information
  const submitUserInfo = () => {
    fetch("https://portal.4tracksltd.com/api/drivers/drivers/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        first_name: firstName,
        last_name: lastName,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        sendCode(data.id);
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleCodeInput = (event) => {
    checkNumericInput(event, setVerificationCode);
  };

  const sendCode = (driverId) => {
    fetch("https://portal.4tracksltd.com/api/drivers/send_verification_code/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: driverId,
      }),
    }).then((response) => {
      if (response.ok) {
        setShowEnterVerificationCode(true);
        setDriverId(driverId);
      } else {
        // catch error?
      }
    });
  };

  const verifyCode = () => {
    fetch("https://portal.4tracksltd.com/api/drivers/verify_code/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: diverId,
        code: verificationCode,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setUserData(data.driver);
          // Create an object with the data you want to store
          const verificationData = {
            verificationCodeSentAt: data.verification_code_sent_at,
            diverId: diverId,
            verificationCode: verificationCode,
          };

          // Store the object in localStorage as a string
          localStorage.setItem(
            "4tracks_verificationData",
            JSON.stringify(verificationData)
          );
        } else {
          // handle errors
          // CLEAN UP FIELDS HERE
        }
      });
  };

  useEffect(() => {
    const verificationDataString = localStorage.getItem(
      "4tracks_verificationData"
    );
    console.log(verificationDataString);
    if (verificationDataString) {
      const verificationData = JSON.parse(verificationDataString);
      const verificationTime = new Date(
        verificationData.verificationCodeSentAt
      ).getTime();
      const currentTime = new Date().getTime();
      const timeElapsedInHours =
        (currentTime - verificationTime) / (1000 * 60 * 60);

      if (timeElapsedInHours < 1) {
        setDriverId(verificationData.diverId);
        setVerificationCode(verificationData.verificationCode);
        setDataStored(true);
      }
    }
  }, []);

  useEffect(() => {
    if (dataStored) {
      verifyCode();
    }
  }, [dataStored]);

  return (
    <div className={styles.enterWindow}>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button content={"Check Email"} style={"classicButton"} fn={checkEmail} />

      {userExists === false && (
        <>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <button onClick={submitUserInfo}>Submit</button>
        </>
      )}
      {showEnterVerificationCode && (
        <>
          <p>The verification code has been sent to your email</p>
          <NumericInput
            value={verificationCode}
            updateState={setFormData}
            placeholder={"Verification code"}
          />
          {/* <input
            type={"text"}
            value={verificationCode}
            onChange={handleCodeInput}
            placeholder="Verification code"
          /> */}
          <Button
            content={"Send code"}
            style={"classicButton"}
            fn={verifyCode}
          />
        </>
      )}
    </div>
  );
}

export default ApplicationEnterWindow;
