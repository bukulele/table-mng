import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Button from "../button/Button";
import styles from "./hideColumnsModal.module.css";

function HideColumnsModal({
  tableData,
  hiddenColumns,
  setHiddenColumns,
  modalIsOpen,
  closeModal,
}) {
  const [checkList, setCheckList] = useState(null);

  const toggleColumn = (column) => {
    if (hiddenColumns.includes(column)) {
      setHiddenColumns(hiddenColumns.filter((v) => v !== column));
    } else {
      setHiddenColumns(hiddenColumns.concat(column));
    }
  };

  // const createCheckList = () => {
  //   let list = tableData.map((item) => {
  //     return (
  //       <div>
  //         <label htmlFor={`columns_hide_${item.dataKey}`}>
  //           <input
  //             id={`columns_hide_${item.dataKey}`}
  //             type="checkbox"
  //             value="NAME"
  //             checked={!hiddenColumns.includes(item.dataName)}
  //             onChange={() => toggleColumn(item.dataName)}
  //           />
  //           {item.dataName}
  //         </label>
  //       </div>
  //     );
  //   });
  //   return list;
  // };

  useEffect(() => {
    Modal.setAppElement("body");
  }, []);

  useEffect(() => {
    let list = tableData.map((item) => {
      return (
        <div
          key={`columns_hide_key_${item.dataKey}`}
          className={styles.listPoint}
        >
          <input
            id={`columns_hide_${item.dataKey}`}
            type="checkbox"
            value="NAME"
            checked={!hiddenColumns.includes(item.dataName)}
            onChange={() => toggleColumn(item.dataName)}
            className={styles.checkBox}
          />
          <label htmlFor={`columns_hide_${item.dataKey}`}>
            {item.dataName}
          </label>
        </div>
      );
    });
    setCheckList(list);
  }, [tableData, hiddenColumns]);

  return (
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
      <h2>Choose columns to show</h2>
      <div className={styles.listContainer}>{checkList}</div>
      <Button content={"Close"} style={"classicButton"} fn={closeModal} />
    </Modal>
  );
}

export default HideColumnsModal;
