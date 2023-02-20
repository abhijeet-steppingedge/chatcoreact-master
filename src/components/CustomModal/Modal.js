import React from "react";
import "./Modal.css";

function Modal({ setOpenModal, children }) {
  return (
    <div id="myModal" className="modal">
      <div className="modal-content">
        <span onClick={() => {
          setOpenModal(false)
          try {
            document.getElementById('cat-container').style.zIndex = "10";
            document.getElementById('search-bar-id').style.zIndex = "10";
            document.getElementById('search-bar-id').style.position = "inherit";

          } catch (error) {
            console.log('error', error)
          }
        }} className="close">&times;</span>
        {children}
      </div>

    </div>
  );
}

export default Modal;
