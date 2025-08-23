import React, { useState, useEffect } from "react";
import "./studentDashboard.css";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Modal from "../../components/Modal/Modal";
import StudentModal from "./StudentModal/StudentModal";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const StudentDashboard = (props) => {
  // Fetching userInfo from Local Storage
  let userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

  const [modal, setModal] = useState(false);
  const [history, setHistory] = useState([]); // State to hold medicine usage history of the student
  const [selectedHistory, setSelectedHistory] = useState(null); // State to hold medicine history on a particular date

  const handleOnOffModal = (item) => {
    setModal((prev) => !prev);
    setSelectedHistory(item? item: null);
  };

  const fetchData = async () => {
    props.showLoader();
    await axios
      .get(`http://localhost:4000/api/history/get?roll=${userInfo?.roll}`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        setHistory(response.data.history);
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

  return (
    <div className="student-dashboard">
      <div className="student-info">
        <div className="welcome-user">
          Welcome, <span>{userInfo?.name}</span>
        </div>
        <div className="welcome-user">{userInfo?.roll}</div>
        <div className="welcome-user">{userInfo?.email}</div>
      </div>

      <div className="student-data">
        <div className="student-data-header">
          <div className="student-header-title">View</div>
          <div className="student-header-title">Date</div>
        </div>

        <div className="student-row-items">
          {history.map((item, index) => {
            return (
              <div key={index} className="student-row-item">
                <div onClick={() => handleOnOffModal(item)}>
                  <RemoveRedEyeIcon sx={{ cursor: "pointer" }} />
                </div>
                <div>{item.createdAt.slice(0,10).split("-").reverse().join("-")}</div>
              </div>
            );
          })}
        </div>
      </div>
      {modal && (
        <Modal
          header={"Medicine details"}
          handleClose={handleOnOffModal}
          children={<StudentModal  selectedHistory={selectedHistory} />}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default StudentDashboard;
