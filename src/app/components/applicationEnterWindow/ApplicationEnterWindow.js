import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./applicationEnterForm.module.css";

function ApplicationEnterWindow({ setUserData }) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userExists, setUserExists] = useState(null);
  const router = useRouter();

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
          // If user exists, redirect to the application page
          // router.push("/application");
          setUserData(data.driver);
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
        // Handle response for user info submission
        // console.log("User info submitted:", data);
        // Optionally redirect or show success message
        setUserData(data);
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className={styles.enterWindow}>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={checkEmail}>Check Email</button>

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
    </div>
  );
}

export default ApplicationEnterWindow;