import React, { useState, useEffect } from "react";
import "./manageMedicine.css";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchBox from "../../../components/SearchBox/SearchBox";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "../../../components/Modal/Modal";
import MedicineModal from "./MedicineModal/MedicineModal";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

function ManageMedicine(props) {
  const [medicineSearch, setMedicineSearch] = useState("");
  const [addModal, setAddModal] = useState(false); // for toggling add Medicine modal ON and OFF
  const [clickedMedicine, setClickedMedicine] = useState(null); // State to hold the selected medicines for edit or delete

  
  const [data, setData] = useState([]); // For fetching medicines from backend

  const onOffModal = () => {
    if(addModal) // If medicine modal is open through "Add" button or "Edit" icon
    console.log("clickedMedicine",clickedMedicine);
      setClickedMedicine(null); // Erase clicked medicine
    setAddModal((prev) => !prev); // Resets AddModal state to switch the Modal off during close button and On during Add button click
  };

  const onChangeValue = (value) => {
    setMedicineSearch(value);
  };

  const fetchData = async () => {
    props.showLoader();
    await axios
      .get(
        `http://localhost:4000/api/medicine/search-by-name?name=${medicineSearch}`
      )
      .then((response) => {
        setData(response.data.medicines);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.error);
      })
      .finally(() => {
        props.hideLoader();
      });
  };

  const handleEdit = (item) => { // When "Edit" icon is clicked, AddModal is true
    setClickedMedicine(item);
    setAddModal(true);
  }

  const filterOutMedicine = (id) => {
    let newArr = data.filter((item)=> item._id !== id);
    setData(newArr);
  }

  const handleDelete = async (id) => {
    props.showLoader();
    await axios.delete(`http://localhost:4000/api/medicine/delete/${id}`, {withCredentials: true})
    .then((response) => {
      filterOutMedicine(id);
      toast.success(response.data.message);
    })
    .catch(err => {
      toast.error(err?.response?.data?.error)
  })
    .finally(() => {
      props.hideLoader();
    })  
  };

  useEffect(() => {
    fetchData();
  }, [medicineSearch]);

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
        <div className="add-manage-medicine" onClick={onOffModal}>
          Add
        </div>
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
            {data.map((item, index) => {
              return (
                <div key={index} className="report-form-row">
                  <div className="">{index + 1}</div>
                  <div className="col-2-mng">{item.name}</div>
                  <div className="col-2-mng">{item?.addedBy?.name}</div>
                  <div className="col-3-mng">{item.quantity}</div>
                  <div className="edit-icon" onClick={()=>handleEdit(item)}>
                    <EditIcon />
                  </div>
                  <div className="delete-icon" onClick={()=> handleDelete(item._id)}>
                    <DeleteIcon />
                  </div>
                </div>
              );
            })}
            {data.length === 0 && (
              <div className="report-form-row">
                <div className="">No Medicine found.</div>
              </div>
            )}
          </div>
        </div>
      </div>
      {addModal && (
        <Modal
          header="Manage Medicine"
          handleClose={onOffModal}
          children={<MedicineModal showLoader={props.showLoader} hideLoader={props.hideLoader} clickedMedicine={clickedMedicine}/>}
        />
      )}
      <ToastContainer />
    </div>
  );
}

export default ManageMedicine;
