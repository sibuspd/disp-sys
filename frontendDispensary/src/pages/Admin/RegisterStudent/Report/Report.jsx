import React, { useState } from "react";
import "./report.css";
import SearchBox from "../../../../components/SearchBox/SearchBox";
import DeleteIcon from '@mui/icons-material/Delete';

function Report() {
  const [searchMedicinName, setSearchMedicineName] = useState("");
  const [dropDown, setDropDown] = useState(false);
  const [stocks, setStocks] = useState([]);

  const onChange = (value) => {
    setSearchMedicineName(value);
  };
  return (
    <div className="report-register">
      <div className="medicine-suggestion-block">
        <SearchBox
          value={searchMedicinName}
          onChange={onChange}
          placeholder="Search Medicine"
        />
        {dropDown && (
          <div className="report-dropdown">
            <div className="report-medicine-dropdown">Paracetamol</div>
            <div className="report-medicine-dropdown">Amoxicillin</div>
            <div className="report-medicine-dropdown">Ibuprofen</div>
            <div className="report-medicine-dropdown">Levocetrizine</div>
            <div className="report-medicine-dropdown">Becozyme Complex</div>
          </div>
        )}
      </div>
        {/* Report Table */}
      <div className="report-form-rows">
        {/* Report Table Header */}
        <div className="report-form-header">
          <div className="col-1-rm">Medicine Name</div>
          <div className="col-2-rm">Quantity Left</div>
          <div className="col-3-rm">Required Quantity</div>
          <div className="col-4-rm">Delete</div>
        </div>
        {/* Report Table Rows */}
        <div className="report-form-row-block">
          <div className="report-form-row">
            <div className="col-1-rm">Name</div>
            <div className="col-2-rm">10</div>
            <div className="col-3-rm"><input type="number" className="input-table"/></div>
            <div className="delete-icon col-4-rm"><DeleteIcon/></div>
          </div>          
          <div className="report-form-row">
            <div>No data yet</div>
          </div>
        </div>
      </div>

      <div className="modal-submit">Submit</div>
    </div>
  );
}

export default Report;
