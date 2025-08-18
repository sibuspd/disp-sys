import React, { useState, useEffect } from "react";
import "./nearByHospital.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "../../../components/Modal/Modal";
import NearByModal from "./NearByModal/NearByModal";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const NearByHospital = (props) => {
  const [modal, setModal] = useState(false);
  const [data, setData] = useState([]); // Fetching Hospital Data from backend
  const [clickedItem, setClickedItem] = useState(null); // For Edit/Delete functionality

  const onOffModal = () => {
    if(modal){
      setClickedItem(null); // Reset clicked item when modal is closed
    }
    setModal((prev) => !prev);
  };

  const fetchData = async () => {
    props.showLoader();
    await axios
      .get("http://localhost:4000/api/hospital/get")
      .then((response) => {
        setData(response.data.hospitals);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.error);
      })
      .finally(() => {
        props.hideLoader();
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (item) => {
    setClickedItem(item);
    setModal(true);
  }

  const filterOutData = (id) => {
    let newArr = data.filter((item)=> item._id !== id);
    setData(newArr);
  }
  const handleDelete = async (id) => {
    props.showLoader();
    await axios.delete(`http://localhost:4000/api/hospital/delete/${id}`, { withCredentials: true })
    .then((response)=>{
      filterOutData(id);
      toast.success(response.data.message);
    })
    .catch(err=>{
      toast.error(err?.response?.data?.error);
    })
    .finally(()=>{
      props.hideLoader();
    });
  }

  return (
    <div className="admin-facility">
      <div className="go-back">
        <Link to="/admin/dashboard">
          <ArrowBackIcon /> Back to Dashboard
        </Link>
      </div>

      <div className="admin-facility-header">
        <div>Nearby Hospitals</div>
        <div className="add-facility-btn" onClick={onOffModal}>
          Add
        </div>
      </div>

      <div className="admin-facility-rows">
        {data.map((item, index) => {
          return (
            <div  key={index} className="admin-facility-row">
              <div className="admin-facility-left">
                <div className="admin-facility-title">{item.name}</div>
                <div>{item.address}</div>
                <div style={{ marginTop: "10px" }}>{item.contact}</div>
                <div style={{ marginTop: "10px" }}>Added By: <b>{item?.addedBy?.name}</b></div>
              </div>

              <div className="admin-facility-btns">
                <div onClick={()=>handleEdit(item)}>
                  <EditIcon />
                </div>
                <div onClick={()=>handleDelete(item._id)}>
                  <DeleteIcon />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {modal && (
        <Modal
          headers="Add Facility"
          handleClose={onOffModal}
          children={<NearByModal clickedItem={clickedItem}/>}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default NearByHospital;
