import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./applicationEnterForm.module.css";

function ApplicationEnterWindow() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userExists, setUserExists] = useState(null);
  const router = useRouter();

  // Function to handle the initial email check
  const checkEmail = () => {
    fetch("/api/check-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.exists) {
          // If user exists, redirect to the application page
          router.push("/application");
        } else {
          // If user does not exist, show additional fields
          setUserExists(false);
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  // Function to handle submission of all user information
  const submitUserInfo = () => {
    fetch("/api/submit-user-info", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, firstName, lastName }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle response for user info submission
        console.log("User info submitted:", data);
        // Optionally redirect or show success message
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
