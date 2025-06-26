import React, { useState } from "react";
import "./manageStaff.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Email } from "@mui/icons-material";

function ManageStaff() {
  const [inputField, setInputField] = useState({
    name: "",
    email: "",
    password: "",
    designation: "",
    mobileNumber: "",
  });
  const handleOnChange = (event, key) => {
    setInputField({ ...inputField, [key]: event.target.value });
  };

  return (
    <div className="add-staffs-box">
      {/* Input Form */}
      <form action="" className="register-form">
        <div className="register-form-div">
          <div className="register-input-box">
            <input
              className="input-box-register"
              type="text"
              placeholder="Staff Name"
              value={inputField.name}
              onChange={(event) => {
                handleOnChange(event, "name");
              }}
            />
          </div>
          <div className="register-input-box">
            <input
              className="input-box-register"
              type="text"
              placeholder="Email Id"
              value={inputField.email}
              onChange={(event) => {
                handleOnChange(event, "email");
              }}
            />
          </div>
          <div className="register-input-box">
            <input
              className="input-box-register"
              type="text"
              placeholder="password"
              value={inputField.password}
              onChange={(event) => {
                handleOnChange(event, "password");
              }}
            />
          </div>
          <div className="register-input-box">
            <input
              className="input-box-register"
              type="text"
              placeholder="Designation"
              value={inputField.designation}
              onChange={(event) => {
                handleOnChange(event, "designation");
              }}
            />
          </div>
          <div className="register-input-box">
            <input
              className="input-box-register"
              type="text"
              placeholder="Mobile number"
              value={inputField.mobileNo}
              onChange={(event) => {
                handleOnChange(event, "mobileNo");
              }}
            />
          </div>
        </div>
        <button type="submit" className="form-btn reg-btn">
          Add Staff
        </button>
      </form>

      {/* Staff details fetched from backend */}
      <div className="list-staffs">
        <div className="list-staff">
          <div>Sabyasachi</div>
          <div className="list-staff-btns">
            <div style={{ cursor: "pointer" }}>
              <EditIcon />
            </div>
            <div style={{ cursor: "pointer" }}>
              <DeleteIcon />
            </div>
          </div>
        </div>
        <div className="list-staff">
          <div>Anurag</div>
          <div className="list-staff-btns">
            <div style={{ cursor: "pointer" }}>
              <EditIcon />
            </div>
            <div style={{ cursor: "pointer" }}>
              <DeleteIcon />
            </div>
          </div>
        </div>
        <div className="list-staff">
          <div>ACP</div>
          <div className="list-staff-btns">
            <div style={{ cursor: "pointer" }}>
              <EditIcon />
            </div>
            <div style={{ cursor: "pointer" }}>
              <DeleteIcon />
            </div>
          </div>
        </div>
        <div className="list-staff">
          <div>Conan Daya</div>
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

export default ManageStaff;
