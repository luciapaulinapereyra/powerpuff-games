import React from "react";
import "./index.css";

const Modal = ({ visible, children, error, onExit }) => {
  if (!visible) return <div></div>;

  return (
    <div className="modal overlay active" id="overlay">
      <div className={error ? "modal popup error" : "modal popup"} id="popup">
        <button onClick={onExit} id="btnClose" className="modal btnClose">
          x
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
