import React, { useState } from "react";
import "./registerStudent.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import SearchBox from "../../../components/SearchBox/SearchBox";
import Modal from "../../../components/Modal/Modal";
import Report from "./Report/Report";

function RegisterStudent() {

  const [searchStudent, setSearchStudent] = useState("");
  const [reportModal, setReportModal] = useState(false);

  const [studentDetail, setStudentDetail]  = useState(
    {_id:"", email: "", name: "", roll: "", mobileNo: "", fatherName: "", fatherMobile: "", address: "", previous_health: "", age: "", bloodGroup: "" }
  );

  const handleOnchangeInputField = (event, key) => {
    setStudentDetail({...studentDetail, [key]: event.target.value});
  }

  const openCloseModal = () => {
    setReportModal(prev => !prev);
  }

  const handleChange = (value) => {
    setSearchStudent(value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div className="register-student">
      <div className="go-back">
        <Link to="/admin/dashboard">
          <ArrowBackIcon />  Back to Dashboard
        </Link>
      </div>
      <SearchBox placeholder="Search student by roll no." value={searchStudent} onChange={handleChange}/>
      <div className="register-form-block">
        <div className="register-form-header">Register Student</div>
        <form action="" className="register-form" onSubmit={handleSubmit}>
          <div className="register-form-div">
            <div className="register-input-box">
              <input type="text" className="input-box-register" placeholder="Student's Name"
                value={studentDetail.name} onChange={(event) => {handleOnchangeInputField(event, "name");}}/>
            </div>            
            <div className="register-input-box">
              <input type="email" className="input-box-register" placeholder="Enter Email Id"
                value={studentDetail.email} onChange={(event) => {handleOnchangeInputField(event, "email");}}/>
            </div>            
            <div className="register-input-box">
              <input type="text" className="input-box-register" placeholder="Roll No."
                value={studentDetail.roll} onChange={(event) => {handleOnchangeInputField(event, "roll");}}/>
            </div>            
            <div className="register-input-box">
              <input type="text" className="input-box-register" placeholder="Mobile number"
                value={studentDetail.mobileNo} onChange={(event) => {handleOnchangeInputField(event, "mobileNo");}}/>
            </div>            
            <div className="register-input-box">
              <input type="text" className="input-box-register" placeholder="Guardian's name"
                value={studentDetail.fatherName} onChange={(event) => {handleOnchangeInputField(event, "fatherName");}}/>
            </div>            
            <div className="register-input-box">
              <input type="text" className="input-box-register" placeholder="Guardian's mobile number"
                value={studentDetail.fatherMobile} onChange={(event) => {handleOnchangeInputField(event, "fatherMobile");}}/>
            </div>            
            <div className="register-input-box">
              <input type="text" className="input-box-register" placeholder="Address"
                value={studentDetail.address} onChange={(event) => {handleOnchangeInputField(event, "address");}}/>
            </div>            
            <div className="register-input-box">
              <input type="text" className="input-box-register" placeholder="Previous health issue"
                value={studentDetail.previous_health} onChange={(event) => {handleOnchangeInputField(event, "previous_health");}}/>
            </div>            
            <div className="register-input-box">
              <input type="text" className="input-box-register" placeholder="Age"
                value={studentDetail.age} onChange={(event) => {handleOnchangeInputField(event, "age");}}/>
            </div>            
            <div className="register-input-box">
              <input type="text" className="input-box-register" placeholder="Blood Group"
                value={studentDetail.bloodGroup} onChange={(event) => {handleOnchangeInputField(event, "bloodGroup");}}/>
            </div>
          </div>
          <button type="submit" className="form-btn reg-btn">Register</button>
          <div className="block-divs">
          <button type="submit" className="form-btn reg-btn">Update</button>
          <button type="submit" className="form-btn reg-btn" onClick={openCloseModal}>Report</button>
            </div> 
        </form>
      </div>
      {/* Conditional Rendering of Report Modal */}
      {reportModal && <Modal header="Report a Student" handleClose={openCloseModal} children={<Report/>} />}
    </div>
  );
}

export default RegisterStudent;
