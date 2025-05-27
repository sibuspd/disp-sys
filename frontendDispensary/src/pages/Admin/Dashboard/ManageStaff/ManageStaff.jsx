import React from "react";
import "./manageStaff.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function ManageStaff() {
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
            />
          </div>
          <div className="register-input-box">
            <input
              className="input-box-register"
              type="text"
              placeholder="Email Id"
            />
          </div>
          <div className="register-input-box">
            <input
              className="input-box-register"
              type="text"
              placeholder="password"
            />
          </div>
          <div className="register-input-box">
            <input
              className="input-box-register"
              type="text"
              placeholder="Designation"
            />
          </div>
          <div className="register-input-box">
            <input
              className="input-box-register"
              type="text"
              placeholder="Mobile number"
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
            <div style={{cursor:"pointer"}}>
              <EditIcon />
            </div>
            <div style={{cursor:"pointer"}}>
              <DeleteIcon />
            </div>
          </div>
        </div>       
        <div className="list-staff">
          <div>Anurag</div>
          <div className="list-staff-btns">
            <div style={{cursor:"pointer"}}>
              <EditIcon />
            </div>
            <div style={{cursor:"pointer"}}>
              <DeleteIcon />
            </div>
          </div>
        </div>       
        <div className="list-staff">
          <div>ACP</div>
          <div className="list-staff-btns">
            <div style={{cursor:"pointer"}}>
              <EditIcon />
            </div>
            <div style={{cursor:"pointer"}}>
              <DeleteIcon />
            </div>
          </div>
        </div>       
        <div className="list-staff">
          <div>Conan Daya</div>
          <div className="list-staff-btns">
            <div style={{cursor:"pointer"}}>
              <EditIcon/>
            </div>
            <div style={{cursor:"pointer"}}>
              <DeleteIcon/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageStaff;
