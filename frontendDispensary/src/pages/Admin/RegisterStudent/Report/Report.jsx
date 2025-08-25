import React, { useState, useEffect } from "react";
import "./report.css";
import SearchBox from "../../../../components/SearchBox/SearchBox";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

function Report(props) {
  const [searchMedicineName, setSearchMedicineName] = useState(""); // For holding the search input value
  const [dropDown, setDropDown] = useState(false); // For controlling the visibility of the dropdown medicine list
  const [selectedMedicines, setSelectedMedicines] = useState([]); // For holding the list of selected medicine from the dropdown/ a history
  const [data, setData] = useState([]); // For holding the list of medicines retrieved from the Medicines collection and displayed in the dropdown

  const onChange = (value) => {
    setSearchMedicineName(value);
  };

  const fetchData = async () => {
    await axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/api/medicine/search-by-name?name=${searchMedicineName}`
      )
      .then((response) => {
        setData(response.data.medicines); // Fetches medicine(s) from the Medicines collection based on the search input
        setDropDown(true);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
        setDropDown(false); // Hide dropdown list of histories on error
      });
  };

  useEffect(() => {
    fetchData();
  }, [searchMedicineName]);

  const addMedicine = (item) => {
    let exist = 0; // To keep track if the particular medicine was already selected previously or not
    selectedMedicines.map((it) => {
      if (it._id === item._id) {
        // If selected medicine was already selected previously from the dropdown
        exist = 1;
      }
    });
    item = { ...item, requiredQuantity: "" }; // Initialize required quantity to 0
    if (exist === 0) {
      setSelectedMedicines([...selectedMedicines, item]); // Append the selected medicine to the selectedMedicine array after adding 'requiredQuantity' property
    }
    setSearchMedicineName(""); // Clear the search input after selection
    setDropDown(false); // Hide the dropdown list after selection
  };

  const onChangeHandle = (event, ind) => { // ind here refers to the medicine whose required quantity is being changed
    const arr = selectedMedicines.map((item, index)=>{
      if(index === ind){ // Matching the index of the medicine whose required quantity is being changed against the index of the same medicine in the selectedMedicines array
        // If stock is inadequate      
        if(parseInt(item.quantity) < parseInt(event.target.value)) { // If the required quantity is greater than the quantity left
          toast.error("Required quantity exceed the quantity available");
          return {...item}; // Return the medicine as it is
        }
        // If stock is ample
        return {...item, requiredQuantity: event.target.value}; // Return the same medicine with updated required quantity
      }
      // If the index matching fails
      return {...item}; // Return the medicine as it is
    });
    setSelectedMedicines(arr); // Update the selectedMedicines array with the new array
  }

  const handleDelete = (id) => {
    let arr = selectedMedicines.filter((item) => item._id !== id);
    setSelectedMedicines(arr); // Remove the medicine from the selectedMedicines array
  }

  const handleOnSubmit = async () => {
    if(selectedMedicines.length === 0) return toast.error("No medicine was selected");
    if(checkInputValid()) return toast.error("Please mention required quantity for all medicines");
    
    await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/history/add`,{roll:props.studentDetail.roll, student:props.studentDetail._id, medicines:selectedMedicines},{withCredentials: true, })
    .then((response)=>{
      toast.success(response.data.message);

      setTimeout(()=>{
        props.handleCloseModal(); // Close the modal after 1 second of successful submission
      },1000);
    })
    .catch(err=>{
      toast.error(err?.response?.data?.message);
    })
  }

  const checkInputValid = () => { // To check all medicines quantities are mentioned
    let invalid = false;
    selectedMedicines.map((item) => {
      if(item.requiredQuantity.trim().length === 0) {
        invalid = true; // If any medicine has an empty or negative required quantity
      }
    });
    return invalid; // Here invalid is false
  }

  return (
    <div className="report-register">
      <div className="medicine-suggestion-block">
        <SearchBox
          value={searchMedicineName}
          onChange={onChange}
          placeholder="Search Medicine"
        />
        {dropDown && searchMedicineName.trim().length !== 0 && (
          <div className="report-dropdown">
            {data.map((item, index) => {
              return (
                <div
                  key={index}
                  className="report-medicine-dropdown"
                  onClick={() => addMedicine(item)}
                >
                  {item.name}
                </div>
              );
            })}
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
          {selectedMedicines.map((item, index) => {
            return (
              <div key={index} className="report-form-row">
                <div className="col-1-rm">{item.name}</div>
                <div className="col-2-rm">{item.quantity}</div>
                <div className="col-3-rm">
                  <input type="number" className="input-table" 
                  value={selectedMedicines[index].requiredQuantity}
                  onChange={(event) => onChangeHandle(event, index)}/>
                </div>
                <div className="delete-icon col-4-rm" onClick={()=>handleDelete(item._id)}>
                  <DeleteIcon />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="modal-submit" onClick={handleOnSubmit}>Submit</div>
      <ToastContainer />
    </div>
  );
}

export default Report;
