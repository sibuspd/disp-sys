import React, { useState } from "react";
import "./studentDashboard.css";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Modal from "../../components/Modal/Modal";
import StudentModal from "./StudentModal/StudentModal";

const StudentDashboard = () => {
  const [modal, setModal] = useState(false);

  const handleOnOffModal = () => {
    setModal((prev) => !prev);
  };
  return (
    <div className="student-dashboard">
      <div className="student-info">
        <div className="welcome-user">
          Welcome, <span>Student</span>
        </div>
        <div className="welcome-user">3234</div>
        <div className="welcome-user">xyz@yahoo.in</div>
      </div>

      <div className="student-data">
        <div className="student-data-header">
          <div className="student-header-title">View</div>
          <div className="student-header-title">Date</div>
        </div>

        <div className="student-row-items">
          <div className="student-row-item">
            <div onClick={() => handleOnOffModal()}>
              <RemoveRedEyeIcon sx={{ cursor: "pointer" }} />
            </div>
            <div>23-06-2025</div>
          </div>
          <div className="student-row-item">
            <div onClick={() => handleOnOffModal()}>
              <RemoveRedEyeIcon sx={{ cursor: "pointer" }} />
            </div>
            <div>23-06-2025</div>
          </div>
          <div className="student-row-item">
            <div onClick={() => handleOnOffModal()}>
              <RemoveRedEyeIcon sx={{ cursor: "pointer" }} />
            </div>
            <div>23-06-2025</div>
          </div>
        </div>
      </div>
      {modal && <Modal header={"Medicine details"} handleClose={handleOnOffModal} children={<StudentModal/>}/>}
    </div>
  );
};

export default StudentDashboard;
