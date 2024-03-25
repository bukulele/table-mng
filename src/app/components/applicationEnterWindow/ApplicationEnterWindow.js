import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
  const [saveToLocalStorage, setSaveToLocalStorage] = useState(true);
  const [dataStored, setDataStored] = useState(false);
  // const router = useRouter();

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
          fetch(
            "https://portal.4tracksltd.com/api/drivers/send_verification_code/",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                id: data.driver_id,
              }),
            }
          ).then((response) => {
            if (response.ok) {
              setShowEnterVerificationCode(true);
              setDriverId(data.driver_id);
            } else {
              // catch error?
            }
          });
          // If user exists, redirect to the application page
          // router.push("/application");
          // setUserData(data.driver);
        } else {
          // If user does not exist, show additional fields
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
        console.log(data);
        setUserData(data);
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleCodeInput = (event) => {
    checkNumericInput(event, setVerificationCode);
    // const { value, selectionStart, selectionEnd } = event.target;
    // const oldValue = event.target.defaultValue;
    // const nonDigits = /\D+/g;

    // // Check if the new value is numeric or if it's a control action (backspace, delete, arrow keys)
    // // This is simplified; for more complex scenarios, additional checks may be necessary
    // if (!nonDigits.test(value) || value === "") {
    //   setVerificationCode(value);
    // } else {
    //   setVerificationCode(oldValue);

    //   // This timeout ensures the cursor position is updated after React re-renders the component
    //   setTimeout(() => {
    //     event.target.setSelectionRange(selectionStart - 1, selectionEnd - 1);
    //   }, 0);
    // }
  };

  const sendCode = () => {
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
          if (saveToLocalStorage) {
            console.log("SAVE");
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
          }
        } else {
          // handle errors
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
        setSaveToLocalStorage(false);
        setDataStored(true);
        // Less than an hour has passed, so we can proceed with sending the code
      }
    }
  }, []);

  useEffect(() => {
    if (dataStored) {
      sendCode(); // Assumes diverId and verificationCode are accessible
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
          <input
            type={"text"}
            value={verificationCode}
            onChange={handleCodeInput}
            placeholder="Verification code"
          />
          <Button content={"Send code"} style={"classicButton"} fn={sendCode} />
        </>
      )}
    </div>
  );
}

export default ApplicationEnterWindow;
