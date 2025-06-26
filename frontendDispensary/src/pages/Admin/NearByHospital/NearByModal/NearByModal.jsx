import React, {useState} from 'react'
import "./nearByModal.css"

const NearByModal = () => {

  const [inputField, setInputField] = useState({name:"", address:"", contact:""});

  const handleOnChange = (event, key) => {
    setInputField({...inputField, [key]: event.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  }
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
          <button type="submit" className="form-btn reg-btn">Add</button>
        </form>
  )
}

export default NearByModal