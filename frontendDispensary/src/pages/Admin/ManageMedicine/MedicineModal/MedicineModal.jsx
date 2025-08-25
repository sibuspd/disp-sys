import React, { useState, useEffect } from "react";
import "./medicineModal.css";
import {toast, ToastContainer} from 'react-toastify';
import axios from "axios";

function MedicineModal(props) {
  const [medicine, setMedicine] = useState({ // State to hold medicine details in input fields
    name: "",
    quantity: "",
    usage: "",
  });

  const handleOnChange = (event, key) => {
    setMedicine({ ...medicine, [key]: event.target.value });
  };

  const updateValue = async () => {
    props.showLoader();
    await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/medicine/update/${props.clickedMedicine._id}`, medicine, {withCredentials: true})
    .then((response)=>{
      window.location.reload();
      toast.success(response.data.message);
    })
    .catch(err=>
      toast.error(err?.response?.data?.error)
    )
    .finally(()=>{
      props.hideLoader();
    });
  }

  const handleSubmit = async(e) => {
    e.preventDefault();

    // Checking whether button is on "Add" or "Update"
    if(props.clickedMedicine){ // Only executes if "Edit" icon is clicked
      updateValue();
      return;
    } 

    // Lines are executed when "Add" button is clicked
    if(medicine.name.trim().length === 0 || !medicine.quantity || medicine.usage.trim().length === 0)
      return toast.error("Please enter all the fields");

    props.showLoader();
    await axios.post('${import.meta.env.VITE_BACKEND_URL}/api/medicine/add', medicine, {withCredentials: true})
    .then((response) => {
      window.location.reload();
      toast.success(response.data.message);
    })
    .catch(err=>{
      toast.error(err?.response?.data?.error);
    })
    .finally(()=>{
      props.hideLoader();
    })
  };

  useEffect(() => { // For preselecting the medicine details in concern when Edit icon is clicked
    if(props.clickedMedicine){
      setMedicine({...medicine, name: props.clickedMedicine.name, quantity: props.clickedMedicine.quantity, usage: props.clickedMedicine.usage});
    }
  },[]);

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="register-form-div">
        <div className="register-input-box">
          <input
            type="text"
            className="input-box-register"
            placeholder="Medicine Name"
            value={medicine.name}
            onChange={(event) => handleOnChange(event, "name")}
          />
        </div>
        <div className="register-input-box">
          <input
            type="number"
            className="input-box-register"
            placeholder="Quantity"
            value={medicine.quantity}
            onChange={(event) => handleOnChange(event, "quantity")}
          />
        </div>
        <div className="register-input-box">
          <input
            type="text"
            className="input-box-register"
            placeholder="Usage"
            value={medicine.usage}
            onChange={(event) => handleOnChange(event, "usage")}
          />
        </div>
      </div>
      <button type="submit" className="form-btn reg-btn">
        {props.clickedMedicine ? "Update" : "Add"}
      </button>
      <ToastContainer/>
    </form>
  );
}

export default MedicineModal;
