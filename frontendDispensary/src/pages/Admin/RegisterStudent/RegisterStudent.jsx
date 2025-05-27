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
              <input type="text" className="input-box-register" placeholder="Student's Name"/>
            </div>            
            <div className="register-input-box">
              <input type="email" className="input-box-register" placeholder="Enter Email Id"/>
            </div>            
            <div className="register-input-box">
              <input type="text" className="input-box-register" placeholder="Roll No."/>
            </div>            
            <div className="register-input-box">
              <input type="email" className="input-box-register" placeholder="Mobile number"/>
            </div>            
            <div className="register-input-box">
              <input type="email" className="input-box-register" placeholder="Guardian's name"/>
            </div>            
            <div className="register-input-box">
              <input type="email" className="input-box-register" placeholder="Guardian's mobile number"/>
            </div>            
            <div className="register-input-box">
              <input type="email" className="input-box-register" placeholder="Address"/>
            </div>            
            <div className="register-input-box">
              <input type="email" className="input-box-register" placeholder="Previous health issue"/>
            </div>            
            <div className="register-input-box">
              <input type="email" className="input-box-register" placeholder="Age"/>
            </div>            
            <div className="register-input-box">
              <input type="email" className="input-box-register" placeholder="Blood Group"/>
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
