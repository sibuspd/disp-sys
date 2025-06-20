import React, { useState } from "react";
import "./facility.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "../../../components/Modal/Modal";
import FacilityModal from "./FacilityModal/FacilityModal";

const Facility = () => {

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
        <div>Facilities</div>
        <div className="add-facility-btn" onClick={onOffModal}>Add</div>
      </div>

      <div className="admin-facility-rows">
        <div className="admin-facility-row">
          <div className="admin-facility-left">
            <div className="admin-facility-title">Title</div>
            <div>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea aut
              natus recusandae alias esse accusamus voluptates. Ea veritatis
              voluptates, provident amet consequatur adipisci eligendi dolores
              placeat. Ducimus odio hic praesentium?
            </div>
            <div style={{ marginTop: "10px" }}>Added by Sabya</div>
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
            <div className="admin-facility-title">Title</div>
            <div>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea aut
              natus recusandae alias esse accusamus voluptates. Ea veritatis
              voluptates, provident amet consequatur adipisci eligendi dolores
              placeat. Ducimus odio hic praesentium?
            </div>
            <div style={{ marginTop: "10px" }}>Added by Sabya</div>
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
      {modal && <Modal headers= "Add Facility" handleClose={onOffModal} children={<FacilityModal/>}/> }
      
    </div>
  );
};

export default Facility;
