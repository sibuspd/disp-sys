import React,{useState, useEffect} from 'react'
import "./facilityModal.css"
import {toast, ToastContainer} from "react-toastify";
import axios from 'axios';

const FacilityModal = (props) => {
  const [inputField, setInputField] = useState({title:"", description:""});

  const handleOnChange = (event, key) => {
    setInputField({...inputField, [key]: event.target.value});
  }

  useEffect(()=>{
    if(props.clickedItem) {
      setInputField({...inputField, title: props.clickedItem.title, description: props.clickedItem.description});
    }
  },[]);

  const updateFacility = async() => {
    await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/facility/update/${props.clickedItem._id}`, inputField, {withCredentials: true})
    .then((response) => {
      window.location.reload();
    })
    .catch((err) => {
      toast.error(err?.response?.data?.error);
    });
  }
    const handleSubmit = async(e) => {
        e.preventDefault();

        // Validation
        if(inputField.title.trim().length === 0 || inputField.description.trim().length === 0) {
          return toast.error("Please fill all the fields");   
        }

        // Only when 'Edit' icon is clicked
        if(props.clickedItem) {
          updateFacility();
          return;
        }

         // When 'Add' icon is clicked
        await axios.post('${import.meta.env.VITE_BACKEND_URL}/api/facility/add', inputField, {withCredentials: true})
        .then((response)=> {
          window.location.reload();
        })
        .catch((err) => {
          toast.error(err?.response?.data?.error);
        });
    }
  return (
    <div className='facility-modal'>
                <form action="" className="register-form" onSubmit={handleSubmit}>
          <div className="">
            <div className="register-input-box">
              <input type="text" className="input-box-register" placeholder="Enter Title"
              value={inputField.title} onChange={(event) => handleOnChange(event, "title")}/>
            </div>
            <div className="register-input-box" style={{marginTop: "20px"}}>
              <textarea type="text" cols={450} rows={10} className="input-box-register" placeholder="Add Description"
              value={inputField.description} onChange={(event) => handleOnChange(event, "description")}/>
            </div>              
          </div>
          <button type="submit" className="form-btn reg-btn">{props.clickedItem? "Update" : "Add"}</button>
        </form>
        <ToastContainer />
    </div>
  )
}

export default FacilityModal