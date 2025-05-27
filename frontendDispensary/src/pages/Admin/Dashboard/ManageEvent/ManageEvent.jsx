import React from "react";
import "./manageEvent.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function ManageEvent() {
  return (
    <div className="add-staffs-box">
      {/* Input Form */}
      <form action="" className="register-form">
        <div className="">
          <div className="register-input-box">
            <input
              className="input-box-register mngEventInp"
              type="text"
              placeholder="Staff Name"
            />
          </div>
        </div>
        <button type="submit" className="form-btn reg-btn">
          Add Staff
        </button>
      </form>

      <div className="list-staffs">
        <div className="list-staff">
          <div>Add an event here</div>
          <div className="list-staff-btns">
            <div style={{ cursor: "pointer" }}>
              <EditIcon />
            </div>
            <div style={{ cursor: "pointer" }}>
              <DeleteIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageEvent;
