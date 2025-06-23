import React, { useState } from 'react'
import "./nearByHospital.css"
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "../../../components/Modal/Modal";
import NearByModal from './NearByModal/NearByModal';

const NearByHospital = () => {

    const [modal, setModal] = useState(false);

    const onOffModal = () => {
        setModal(prev => !prev);
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
        <div className="add-facility-btn" onClick={onOffModal}>Add</div>
      </div>

      <div className="admin-facility-rows">
        <div className="admin-facility-row">
          <div className="admin-facility-left">
            <div className="admin-facility-title">Name</div>
            <div>
              Address Burla NAC 
            </div>
            <div style={{ marginTop: "10px" }}>+91-xxx-xxx-xxxx</div>
          </div>

          <div className="admin-facility-btns">
            <div>
              <EditIcon />
            </div>
            <div>
              <DeleteIcon />
            </div>
          </div>
        </div>
                <div className="admin-facility-row">
          <div className="admin-facility-left">
            <div className="admin-facility-title">Name</div>
            <div>
              Address Burla NAC 
            </div>
            <div style={{ marginTop: "10px" }}>+91-xxx-xxx-xxxx</div>
          </div>

          <div className="admin-facility-btns">
            <div>
              <EditIcon />
            </div>
            <div>
              <DeleteIcon />
            </div>
          </div>
        </div>
      </div>
      {modal && <Modal headers= "Add Facility" handleClose={onOffModal} children={<NearByModal/>}/> }
      
    </div>
  )
}

export default NearByHospital  