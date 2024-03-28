import React, { useState, useEffect } from "react";
import Button from "../button/Button";
import Modal from "react-modal";
import DateInput from "./DateInput";
import styles from "./applicationForm.module.css";
import TextInput from "./TextInput";
import ProvinceSelector from "./ProvinceSelector";

function FileLoaderDL({ driverId, data, apiRoute, name, label }) {
  const [loadedFileName, setLoadedFileName] = useState("");
  const [loadedFileName2, setLoadedFileName2] = useState("");
  const [dLNumber, setDLNumber] = useState("");
  const [dLIssueDate, setDLIssueDate] = useState("");
  const [dLExpDate, setDLExpDate] = useState("");
  const [dLScanFront, setDLScanFront] = useState(null);
  const [dLScanBack, setDLScanBack] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [fileSent, setFileSent] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState("");

  const showLoadFileModal = () => {
    setModalIsOpen(true);
  };

  const closeLoadFileModal = () => {
    setModalIsOpen(false);
  };

  const handleFileChange = (event) => {
    const { name, files } = event.target;

    if (name === "dl_front") {
      setDLScanFront(files[0]);
    }

    if (name === "dl_back") {
      setDLScanBack(files[0]);
    }
  };

  const uploadFile = () => {
    const data = new FormData();

    data.append("file", dLScanFront);
    data.append("file2", dLScanBack);
    data.append("driver", driverId);
    data.append("dl_number", dLNumber);
    data.append("dl_province", selectedProvince);
    data.append("issue_date", dLIssueDate);
    data.append("expiration_date", dLExpDate);

    fetch(apiRoute, {
      method: "POST",
      body: data,
    })
      .then((response) => {
        console.log(response);
        if (response.ok) {
          setFileSent(true);
        } else {
          console.error("Error submitting form");
        }
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
      });
  };

  useEffect(() => {
    Modal.setAppElement("body");
  }, []);

  useEffect(() => {
    if (!data) return;

    if (data.file) {
      let fileName = "";
      let fileNameArr = data.file.split("/");
      fileName = fileNameArr[fileNameArr.length - 1];
      setLoadedFileName(fileName);
    }

    if (data.file2) {
      let fileName2 = "";
      let fileNameArr2 = data.file2.split("/");
      fileName2 = fileNameArr2[fileNameArr2.length - 1];
      setLoadedFileName2(fileName2);
    }
  }, []);

  return (
    <div className={styles.fileLoader}>
      <p className={styles.fileLoaderHeader}>{label}</p>
      {loadedFileName ? (
        <div className={styles.fileLoaderTextContainer}>
          <p className={styles.fileLoaderTextMain}>Files loaded:</p>
          <p className={styles.fileLoaderText}>{loadedFileName}</p>
          <p className={styles.fileLoaderText}>{loadedFileName2}</p>
        </div>
      ) : (
        <p className={styles.fileLoaderTextMain}>No file loaded</p>
      )}
      <Button
        content={"Load file"}
        style={"classicButton"}
        fn={showLoadFileModal}
      />
      <Modal
        isOpen={modalIsOpen}
        contentLabel="Modal Popup"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1,
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "5px",
            color: "black",
            maxHeight: "80%",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          },
        }}
      >
        {fileSent ? (
          <>
            <p className={styles.fileLoaderTextMain}>File sent successfully</p>
            <Button
              content={"OK"}
              style={"classicButton"}
              fn={closeLoadFileModal}
            />
          </>
        ) : (
          <div className={styles.inputContainer}>
            <p className={styles.fileLoaderHeader}>{label}</p>
            <TextInput
              name={"dl_number"}
              label={"DL Number"}
              value={dLNumber}
              updateState={setDLNumber}
            />
            <ProvinceSelector
              value={selectedProvince}
              updateState={setSelectedProvince}
            />
            <DateInput
              name={`issue_date_${name}`}
              label={"DL Issue Date"}
              value={dLIssueDate}
              updateState={setDLIssueDate}
            />
            <DateInput
              name={`exp_date_${name}`}
              label={"DL Expiration Date"}
              value={dLExpDate}
              updateState={setDLExpDate}
            />
            <label htmlFor="dl_front">DL front side scan</label>
            <input
              name={"dl_front"}
              type={"file"}
              onChange={handleFileChange}
            />
            <label htmlFor="dl_back">DL back side scan</label>
            <input name={"dl_back"} type={"file"} onChange={handleFileChange} />
            <div className={styles.buttonsContainer}>
              <Button
                content={"Close"}
                style={"classicButton"}
                fn={closeLoadFileModal}
              />
              <Button
                content={"Send file"}
                style={"classicButton"}
                fn={uploadFile}
              />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default FileLoaderDL;
