import React from 'react'
import "./facilityModal.css"

const FacilityModal = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
    }
  return (
    <div className='facility-modal'>
                <form action="" className="register-form" onSubmit={handleSubmit}>
          <div className="">
            <div className="register-input-box">
              <input type="text" className="input-box-register" placeholder="Enter Title"/>
            </div>
            <div className="register-input-box" style={{marginTop: "20px"}}>
              <textarea type="text" cols={450} rows={10} className="input-box-register" placeholder="Add Description"/>
            </div>              
          </div>
          <button type="submit" className="form-btn reg-btn">Add</button>
        </form>
    </div>
  )
}

export default FacilityModal