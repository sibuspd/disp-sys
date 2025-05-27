import React, { useState } from "react";
import "./manageMedicine.css";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchBox from "../../../components/SearchBox/SearchBox";
import EditIcon from "@mui/icons-material/Edit";

function ManageMedicine() {
  const [medicineSearch, setMedicineSearch] = useState("");

  const onChangeValue = (value) => {
    setMedicineSearch(value);
  };
  return (
    <div className="manageMedicine">
      <div className="go-back">
        <Link to="/admin/dashboard">
          <ArrowBackIcon /> Back to Dashboard
        </Link>
      </div>
      {/* Top Header portion of Manage Medicine */}
      <div className="top-manage-medicine">
        <SearchBox
          placeholder="Search Medicine"
          value={medicineSearch}
          onChange={onChangeValue}
        />
        <div className="add-manage-medicine">Add</div>
      </div>

      <div className="manageMedicine-card">
        <div className="report-form-rows">
          {/* Report Table Header */}
          <div className="report-form-header">
            <div className="">Sr. No.</div>
            <div className="col-2-mng">Medicine Name</div>
            <div className="col-2-mng">Added By</div>
            <div className="col-3-mng">Quantity</div>
            <div className="">Edit</div>
            <div className="">Delete</div>
          </div>
          {/* Report Table Rows */}
          <div className="report-form-row-block">
            <div className="report-form-row">
              <div className="">2</div>
              <div className="col-2-mng">Ibuprofen</div>
              <div className="col-2-mng">Priyanka</div>
              <div className="col-3-mng">34</div>
              <div className="edit-icon">
                <EditIcon />
              </div>
              <div className="delete-icon">
                <DeleteIcon />
              </div>
            </div>
            {/* Blank row */}
            <div className="report-form-row">
              <div className="">No Medicine has been added yet.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageMedicine;
