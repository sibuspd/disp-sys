import React, { useState } from "react";
import "./registerStudent.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import SearchBox from "../../../components/SearchBox/SearchBox";
import Modal from "../../../components/Modal/Modal";
import Report from "./Report/Report";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

function RegisterStudent(props) {
  const [searchStudent, setSearchStudent] = useState(""); // Holds the student's roll number inside search box
  const [reportModal, setReportModal] = useState(false);

  const [studentDetail, setStudentDetail] = useState({
    _id: "",
    email: "",
    name: "",
    roll: "",
    mobileNo: "",
    fatherName: "",
    fatherMobile: "",
    address: "",
    previous_health: "",
    age: "",
    bloodGroup: "",
  });

  const handleOnchangeInputField = (event, key) => {
    setStudentDetail({ ...studentDetail, [key]: event.target.value });
  };

  const openCloseModal = () => {
    setReportModal((prev) => !prev);
  };

  const handleChange = (value) => {
    setSearchStudent(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleSearch = async () => {
    //validation
    if (searchStudent.trim().length === 0)
      return toast.error("Please enter roll number to search");
    props.showLoader();
    await axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/get-student-by-roll/${searchStudent}`,
        { withCredentials: true }
      )
      .then((response) => {
        console.log("Response data is ", response.data.user);
        toast.success(response.data.message);
        setStudentDetail({ ...studentDetail, ...response.data.user }); // If user is found, studentDetail state is already populated with the corresponding response data
        console.log("student Details are ", studentDetail);
      })
      .catch((err) => {
        setStudentDetail({
          _id: "",
          email: "",
          name: "",
          roll: "",
          mobileNo: "",
          fatherName: "",
          fatherMobile: "",
          address: "",
          previous_health: "",
          age: "",
          bloodGroup: "",
        });
        toast.error(err?.response?.data?.error); // Reset the input fields if student not found
      })
      .finally(() => {
        props.hideLoader();
      });
  };

  const handleUpdateFunc = async () => {
    if(studentDetail.name.trim().length === 0 || studentDetail.roll.trim().length === 0 || studentDetail.email.trim().length === 0 || studentDetail.mobileNo.trim().length === 0){
      return toast.error("Name, Roll No., Email and Mobile No. are required fields");
    }

    props.showLoader();
    const {_id, updatedAt, ...student} = {...studentDetail}; // Exclude _id and updatedAt from the student object
    await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/auth/update-student/${_id}`, student, {withCredentials: true})
    .then((response)=>{
      console.log(response.data);
      toast.success(response.data.message);
    })
    .catch(err => {
      toast.error(err?.response?.data?.error);
    })
    .finally(()=>{
      props.hideLoader();
    });
  }

  const registerStudent = async () => {
    if(studentDetail.name.trim().length === 0 || studentDetail.roll.trim().length === 0 || studentDetail.email.trim().length === 0 || studentDetail.mobileNo.trim().length === 0){
      return toast.error("Name, Roll No., Email and Mobile No. are required fields");
    }
    props.showLoader();
    await axios.post("${import.meta.env.VITE_BACKEND_URL}/api/auth/registerStudentByStaff", studentDetail, {withCredentials: true})
    .then((response)=>{
      toast.success(response.data.message);
    })
    .catch(err => {
      setStudentDetail({_id: "", email: "", name: "", roll: "", mobileNo: "", fatherName: "", fatherMobile: "", address: "", previous_health: "", age: "", bloodGroup: ""});
      toast.error(err?.response?.data?.error);
    })
    .finally(()=>{
      props.hideLoader();
    });
  }

  return (
    <div className="register-student">
      <div className="go-back">
        <Link to="/admin/dashboard">
          <ArrowBackIcon /> Back to Dashboard
        </Link>
      </div>
      <SearchBox
        handleClick={handleSearch}
        placeholder="Search student by roll no."
        value={searchStudent}
        onChange={handleChange}
      />
      <div className="register-form-block">
        <div className="register-form-header">Register Student</div>
        <form action="" className="register-form" onSubmit={handleSubmit}>
          <div className="register-form-div">
            <div className="register-input-box">
              <input
                type="text"
                className="input-box-register"
                placeholder="Student's Name"
                value={studentDetail.name}
                onChange={(event) => {
                  handleOnchangeInputField(event, "name");
                }}
              />
            </div>
            <div className="register-input-box">
              <input
                type="email"
                className="input-box-register"
                placeholder="Enter Email Id"
                value={studentDetail.email}
                onChange={(event) => {
                  handleOnchangeInputField(event, "email");
                }}
                disabled={studentDetail?._id}
              />
            </div>
            <div className="register-input-box">
              <input
                type="text"
                className="input-box-register"
                placeholder="Roll No."
                value={studentDetail.roll}
                onChange={(event) => {
                  handleOnchangeInputField(event, "roll");
                }}
              />
            </div>
            <div className="register-input-box">
              <input
                type="text"
                className="input-box-register"
                placeholder="Mobile number"
                value={studentDetail.mobileNo}
                onChange={(event) => {
                  handleOnchangeInputField(event, "mobileNo");
                }}
              />
            </div>
            <div className="register-input-box">
              <input
                type="text"
                className="input-box-register"
                placeholder="Guardian's name"
                value={studentDetail.fatherName}
                onChange={(event) => {
                  handleOnchangeInputField(event, "fatherName");
                }}
              />
            </div>
            <div className="register-input-box">
              <input
                type="text"
                className="input-box-register"
                placeholder="Guardian's mobile number"
                value={studentDetail.fatherMobile}
                onChange={(event) => {
                  handleOnchangeInputField(event, "fatherMobile");
                }}
              />
            </div>
            <div className="register-input-box">
              <input
                type="text"
                className="input-box-register"
                placeholder="Address"
                value={studentDetail.address}
                onChange={(event) => {
                  handleOnchangeInputField(event, "address");
                }}
              />
            </div>
            <div className="register-input-box">
              <input
                type="text"
                className="input-box-register"
                placeholder="Previous health issue"
                value={studentDetail.previous_health}
                onChange={(event) => {
                  handleOnchangeInputField(event, "previous_health");
                }}
              />
            </div>
            <div className="register-input-box">
              <input
                type="text"
                className="input-box-register"
                placeholder="Age"
                value={studentDetail.age}
                onChange={(event) => {
                  handleOnchangeInputField(event, "age");
                }}
              />
            </div>
            <div className="register-input-box">
              <input
                type="text"
                className="input-box-register"
                placeholder="Blood Group"
                value={studentDetail.bloodGroup}
                onChange={(event) => {
                  handleOnchangeInputField(event, "bloodGroup");
                }}
              />
            </div>
          </div>
          {
          studentDetail?._id ? 
          ( <div className="block-divs">
              <button type="submit" className="form-btn reg-btn" onClick={handleUpdateFunc}>Update</button>
              <button type="submit" className="form-btn reg-btn" onClick={openCloseModal}>
                Report
              </button>
            </div>
          ) : ( <button type="submit" className="form-btn reg-btn" onClick={registerStudent}> Register </button>
          )}
        </form>
      </div>
      {/* Conditional Rendering of Report Modal */}
      {reportModal && (
        <Modal  
          header="Report a Student"
          handleClose={openCloseModal}
          children={<Report studentDetail={studentDetail} handleCloseModal={openCloseModal} />}
        />
      )}
      <ToastContainer />
    </div>
  );
}

export default RegisterStudent;
