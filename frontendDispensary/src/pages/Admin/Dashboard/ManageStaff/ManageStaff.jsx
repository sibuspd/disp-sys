import React, { useState, useEffect } from "react";
import "./manageStaff.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Email } from "@mui/icons-material";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
function ManageStaff(props) {
  const [inputField, setInputField] = useState({
    // The user details in the form
    name: "",
    email: "",
    password: "",
    designation: "",
    mobileNo: "",
  });

  const [staffs, setStaffs] = useState([]); // Will contain the list of staffs
  const [clickedStaff, setClickedStaff] = useState(null); // The staff object that has been clicked

  const handleOnChange = (event, key) => {
    setInputField({ ...inputField, [key]: event.target.value });
  };

  const fetchData = async () => {
    props.showLoader(); // Initially set Loading to true when the data is being fetched

    await axios
      .get("${import.meta.env.VITE_BACKEND_URL}/api/auth/get-staff") // axios.get() returns a promise
      .then((response) => {
        setStaffs(response.data.staffs);
        console.log(response.data.staffs);  
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

  const handleUpdate = async() =>{
    await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/auth/update-staff/${clickedStaff?._id}`, inputField, {withCredentials: true} )
    .then((response)=>{
      window.location.reload(); // Reload the page once the staff is updated
    })
    .catch(err=> {
      toast.error(err?.response?.data?.error);
    });
  } 

  // The handleAddStaff(event) would perform both - Add and Update Staffs according to the value of clickedStaff
  const handleAddStaff = async (e) => {
    e.preventDefault(); // Prevents the form from refreshing the page to empty

    if(clickedStaff){
      handleUpdate();
      return toast.success("Staff updated successfully");
    }

    // Validation
    if (
      inputField.name.trim().length === 0 ||
      inputField.email.trim().length === 0 ||
      inputField.password.trim().length === 0 ||
      inputField.designation.trim().length === 0 ||
      inputField.mobileNo.trim().length === 0
    ) {
      console.log("Validation failed");
      return toast.error("Please fill in all details");
    }
    props.showLoader();
    await axios
      .post("${import.meta.env.VITE_BACKEND_URL}/api/auth/add-staff", inputField, {
        withCredentials: true,
      })
      .then((response) => {
        toast.success(response.data.message);
        setStaffs([inputField, ...staffs]); // Append the new staff object to the staffs array
        setInputField({
          name: "",
          email: "",
          password: "",
          designation: "",
          mobileNo: "",
        }); // To re-empty the input fields for further staff addition
      })
      .catch((err) => {
        toast.error(err?.response?.data?.error);
      })
      .finally(() => {
        props.hideLoader();
      });
  };

  const handleOnEditBtn = async (item) => {
    setClickedStaff(item);
    setInputField({ ...inputField, ...item });
  };

  const filterOutData = (id) => {
    let newArr = staffs.filter((item) => item?._id !== id); // Filter the data out that doesn't match the id
    setStaffs(newArr);
  }

  const handleDelete = async(id) =>{
    alert("Are you sure about deleting this entry?");
    await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/auth/delete-staff/${id}`, {withCredentials: true})
    .then((response)=>{
       filterOutData(id);
       toast.success(response.data.message);
    })
    .catch(err=>{
      toast.error(err?.response?.data?.error);
    })
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
              disabled={clickedStaff}
            />
          </div>
          { !clickedStaff && 
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
          }
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
        <button
          type="submit"
          className="form-btn reg-btn"
          onClick={handleAddStaff}
        >
          {!clickedStaff?"Add Staff" :"Update Details"}  
          {/* If Clicked Staff object is not empty then display "Update Details" */}
        </button>
      </form>

      {/* Staff details fetched from backend */}
      <div className="list-staffs">
        {staffs.map((item, index) => {
          return (
            <div key={index} className="list-staff">
              <div>{item.name}</div>
              <div className="list-staff-btns">
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => handleOnEditBtn(item)}
                >
                  <EditIcon />
                </div>
                <div style={{ cursor: "pointer" }}
                  onClick={() => handleDelete(item._id)}>
                  <DeleteIcon />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ToastContainer />
    </div>
  );
}

export default ManageStaff;
