import React, {useState, useEffect} from 'react'
import "./nearByModal.css"
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";

const NearByModal = (props) => {

  const [inputField, setInputField] = useState({name:"", address:"", contact:""});

  const handleOnChange = (event, key) => {
    setInputField({...inputField, [key]: event.target.value});
  }

  const updateFunc = async () => {
    await axios.put(`http://localhost:4000/api/hospital/update/${props.clickedItem._id}`, inputField, {withCredentials: true})
    .then((response)=> {
      window.location.reload();
    })
    .catch(err => {
      toast.error(err?.response?.data?.error);
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(inputField.name.trim().length === 0 || inputField.address.trim().length === 0 || inputField.contact.trim().length === 0) 
      return toast.error("Please enter all the fields");

    // Only update if clickedItem is present/ if Edit icon is clicked 
    if(props.clickedItem){
      updateFunc();
      return;
    }

    // Add new hospital
    await axios.post('http://localhost:4000/api/hospital/add', inputField, {withCredentials: true})
    .then((response) => {
      window.location.reload();
    })
    .catch(err=>{
      toast.error(err?.response?.data?.error);
    });
  }

  useEffect(() => {
    if(props.clickedItem){
      setInputField({...inputField, name: props.clickedItem.name, address: props.clickedItem.address, contact: props.clickedItem.contact});
    }
  }, []);

  return (
            <form action="" className="register-form" onSubmit={handleSubmit}>
          <div className="register-form-div">
            <div className="register-input-box">
              <input type="text" className="input-box-register" placeholder="Name"
              value={inputField.name} onChange={(event) => handleOnChange(event, "name")}/>
            </div>            
            <div className="register-input-box">
              <input type="text" className="input-box-register" placeholder="Address"
              value={inputField.address} onChange={(event) => handleOnChange(event, "address")}/>
            </div>            
            <div className="register-input-box">
              <input type="text" className="input-box-register" placeholder="Phone Number"
              value={inputField.contact} onChange={(event) => handleOnChange(event, "contact")}/>
            </div>            
          </div>
          <button type="submit" className="form-btn reg-btn">{props.clickedItem?"Update":"Add"}</button>
        </form>
  )
}

export default NearByModal