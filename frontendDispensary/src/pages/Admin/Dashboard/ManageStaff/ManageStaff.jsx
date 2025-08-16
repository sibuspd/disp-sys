import React, { useState, useEffect } from "react";
import "./manageStaff.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Email } from "@mui/icons-material";
import axios from "axios";
import {toast,ToastContainer} from 'react-toastify';
function ManageStaff(props) {
  const [inputField, setInputField] = useState({
    name: "",
    email: "",
    password: "",
    designation: "",
    mobileNumber: "",
  });

  const [staffs, setStaffs] = useState([]); // Will contain the list of staffs

  const handleOnChange = (event, key) => {
    setInputField({ ...inputField, [key]: event.target.value });
  };

  const fetchData = async () => {
    props.showLoader(); // Initially set Loading to true when the data is being fetched

    await axios
      .get("http://localhost:4000/api/auth/get-staff") // axios.get() returns a promise
      .then((response) => {
        setStaffs(response.data.staffs);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        props.hideLoader(); // Set Loading to false after data is fetched
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddStaff = async(e) => {
    e.preventDefault(); // Prevents the form from refreshing the page to empty
    // Validation
    if(inputField.name.trim().length === 0 || inputField.email.trim().length === 0 || inputField.password.trim().length === 0 || inputField.designation.trim().length === 0 || inputField.mobileNumber.trim().length === 0)
      {
        console.log("Validation failed");
        return toast.error("Please fill in all details");
      } 
    props.showLoader();
    await axios.post('http://localhost:4000/api/auth/add-staff',inputField,{withCredentials: true})
    .then((response)=>{
      toast.success(response.data.message);
      setStaffs([inputField, ...staffs]); // Append the new staff objectto the staffs array
      setInputField({name: "", email: "", password: "", designation: "", mobileNumber: ""}); // To re-empty the input fields for further staff addition
    })
    .catch(err => {
      toast.error(err?.response?.data?.error);
    })
    .finally(()=>{
      props.hideLoader();
    });

  }

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
              value={inputField.mobileNumber}
              onChange={(event) => {
                handleOnChange(event, "mobileNumber");
              }}
            />
          </div>
        </div>
        <button type="submit" className="form-btn reg-btn" onClick={handleAddStaff}>
          Add Staff
        </button>
      </form>

      {/* Staff details fetched from backend */}
      <div className="list-staffs">
        {staffs.map((item, index) => {
          return (
            <div key={index} className="list-staff">
              <div>{item.name}</div>
              <div className="list-staff-btns">
                <div style={{ cursor: "pointer" }}>
                  <EditIcon />
                </div>
                <div style={{ cursor: "pointer" }}>
                  <DeleteIcon />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ToastContainer/>
    </div>
  );
}

export default ManageStaff;
