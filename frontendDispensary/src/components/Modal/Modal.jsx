import React from "react";
import "./modal.css";
import CloseIcon from "@mui/icons-material/Close";

function Modal(props) {

  const header = props.header?props.header:"Modal"; // Tracks which Modal is active
  const children =props.children?props.children:null;

  const onCloseBtn = () => { // callback on clicking close button icon
    if(props.handleClose)
      props.handleClose(props.value); // Resets the boolean value as true or false for modal state in parent component
    console.log(props.value, "closed"); //The corresponding modal was active till now
  }

  return (
    <div className="modal">
      <div className="modal-card">
        <div className="modal-card-header">
          <div className="modal-card-header-title">{header}</div>
          <div style={{cursor:"pointer"}} onClick={onCloseBtn}>
            <CloseIcon sx={{fontSize:32}}/>
          </div>
        </div>
        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
