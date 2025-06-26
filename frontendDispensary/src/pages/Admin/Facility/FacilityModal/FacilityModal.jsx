import React,{useState} from 'react'
import "./facilityModal.css"

const FacilityModal = () => {

  const [inputField, setInputField] = useState({title:"", description:""});

  const handleOnChange = (event, key) => {
    setInputField({...inputField, [key]: event.target.value});
  }
    const handleSubmit = (e) => {
        e.preventDefault();
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
          <button type="submit" className="form-btn reg-btn">Add</button>
        </form>
    </div>
  )
}

export default FacilityModal