import React, { useState, useEffect } from "react";
import Modal from "react-modal";

function ModalContainer({
  hiddenColumns,
  setHiddenColumns,
  modalIsOpen,
  closeModal,
}) {
  useEffect(() => {
    Modal.setAppElement("body");
  }, []);

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
        },
      }}
    >
      <h2>Modal Popup</h2>
      <button onClick={closeModal}>Close</button>
    </Modal>
  );
}

export default ModalContainer;
