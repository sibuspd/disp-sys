import React, { useState } from "react";
import "./medicineModal.css";

function MedicineModal() {
  const [medicine, setMedicine] = useState({
    name: "",
    quantity: "",
    usage: "",
  });

  const handleOnChange = (event, key) => {
    setMedicine({ ...medicine, [key]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={handleSubmit}>
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
        Add
      </button>
    </form>
  );
}

export default MedicineModal;
