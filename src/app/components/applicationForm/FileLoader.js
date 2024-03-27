import React, { useState, useEffect } from "react";
import Button from "../button/Button";
import Modal from "react-modal";
import DateInput from "./DateInput";
import styles from "./applicationForm.module.css";

function FileLoader({ driverId, data, apiRoute, name, label }) {
  const [loadedFileName, setLoadedFileName] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [fileSent, setFileSent] = useState(false);
  const [fileDate, setFileDate] = useState("");

  const showLoadFileModal = () => {
    setModalIsOpen(true);
  };

  const closeLoadFileModal = () => {
    setModalIsOpen(false);
  };

  const handleFileChange = (event) => {
    const { files } = event.target;
    setFile(files[0]);
  };

  const uploadFile = () => {
    const data = new FormData();

    data.append("file", file);
    data.append("driver", driverId);

    if (name === "abstract") {
      data.append("issue_date", fileDate);
    }

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
    console.log(name);
    if (!data) return;

    let fileName = "";
    let fileNameArr = data.file.split("/");
    fileName = fileNameArr[fileNameArr.length - 1];

    setLoadedFileName(fileName);
  }, []);

  return (
    <div className={styles.fileLoader}>
      <p className={styles.fileLoaderHeader}>{label}</p>
      {loadedFileName ? (
        <div className={styles.fileLoaderTextContainer}>
          <p className={styles.fileLoaderTextMain}>File loaded:</p>
          <p className={styles.fileLoaderText}>{loadedFileName}</p>
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
            {name === "abstract" && (
              <DateInput
                name={`date${name}`}
                label={"Please, enter the date of document"}
                value={fileDate}
                updateState={setFileDate}
              />
            )}
            <input name={name} type={"file"} onChange={handleFileChange} />
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

export default FileLoader;
