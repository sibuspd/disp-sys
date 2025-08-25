import React, { useState, useEffect } from "react";
import "./record.css";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchBox from "../../../components/SearchBox/SearchBox";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Modal from "../../../components/Modal/Modal";
import RecordModal from "./RecordModal/RecordModal";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import StudentAllFiles from "./StudentAllDetails/StudentAllFiles";

function Record(props) {
  const [studentRoll, setStudentRoll] = useState("");
  const [listOfYear, setListOfYear] = useState([]);
  const [listOfMonth, setListOfMonth] = useState([]);

  const currentYear = new Date().getFullYear();
  const [modal, setModal] = useState(false); // Modal for individual usage history
  const [allRecordsModal, setAllRecordsModal] = useState(false); // Modal for all usage history of a particular student

  const [selectedMonth, setSelectedMonth] = useState(""); // For highlighting current month
  const [selectedYear, setSelectedYear] = useState(""); // For highlighting current year

  const [data, setData] = useState([]); // For storing fetched history of medicine usage
  const [selectedHistory, setSelectedHistory] = useState(null); // For storing selected history to be shown in modal
  const [selectedAllDetails, setSelectedAllDetails] = useState(null); // For storing all usage history of a particular student

  const onOffModal = () => {
    // For toggling modal showing individual usage history
    setModal((prev) => !prev);
  };

  const onOffAllRecordsModal = () => {
    // For toggling modal showing all usage history of a particular student
    if(allRecordsModal){
      setSelectedAllDetails(null); // Reset selectedAllDetails when closing modal
    }
    setAllRecordsModal((prev) => !prev);
  };

  const onChangeField = (value) => {
    setStudentRoll(value);
  };

  const fetchData = async () => {
    props.showLoader();
    await axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/api/history/get-history?month=${selectedMonth}&year=${selectedYear}`,
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response.data.history);
        setData(response.data.history);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.error);
      })
      .finally(() => {
        props.hideLoader();
      });
  };

  useEffect(() => {
    // When fetching data from backend
    if (selectedYear === "" || selectedMonth === "") return;
    fetchData();
  }, [selectedYear, selectedMonth]);

  useEffect(() => {
    // Logic for year 2025 and onwards
    let arr = [];
    for (
      let i = 2025;
      i <= parseInt(currentYear);
      i++ // starts from 2025 and ends at current year beyond that.
    )
      arr.unshift(i.toString()); // Adds incrementally from 0 to that year from right to left
    setListOfYear(arr);
    console.log(arr);
    setSelectedYear(arr[0]); // selects the latest year placed at the beginning of the array

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const currentMonthIndex = new Date().getMonth(); // getMonth() returns 0 indexed based number corresponding to the current month
    const pastAndCurrentMonths = months.slice(0, currentMonthIndex + 1); // will contain a subset of the months array upto current month only
    setListOfMonth(pastAndCurrentMonths);
    setSelectedMonth(pastAndCurrentMonths[pastAndCurrentMonths.length - 1]); // last element of the array
  }, []);

  const handleOnOpenModal = (item) => {
    setModal((prev) => !prev);
    setSelectedHistory(item ? item : null);
  };

  const handleClick = async () => {
    if (studentRoll.trim().length === 0)
      return toast.error("Please enter a Roll No.");
    props.showLoader();
    await axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/history/get?roll=${studentRoll}`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        setAllRecordsModal(true);
        setSelectedAllDetails(response.data.history);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.error);
      })
      .finally(() => {
        props.hideLoader();
      });
  };

  return (
    <div className="records">
      <div className="go-back">
        <Link to="/admin/dashboard">
          <ArrowBackIcon /> Back to Dashboard
        </Link>
      </div>
      {/* SearchBox */}
      <SearchBox
        value={studentRoll}
        onChange={onChangeField}
        placeholder="Search  by Roll No."
        handleClick={handleClick}
      />
      {/* Years and Months display */}
      <div className="record-date-block">
        Select Year
        <div className="record-date-year">
          {listOfYear.map((item, index) => (
            <div
              key={index}
              className={`record-year 
          ${item === selectedYear ? `active-stats` : null}`}
              onClick={() => setSelectedYear(item)}
            >
              {item}
            </div>
          ))}
        </div>
        Select Month
        <div className="record-date-year">
          {listOfMonth.map((item, index) => (
            <div
              key={index}
              className={`record-year 
              ${item === selectedMonth ? `active-stats` : null}`}
              onClick={() => setSelectedMonth(item)}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Data Table */}
      <div className="manageMedicine-card">
        <div className="report-form-rows">
          {/* Report Table Header */}
          <div className="report-form-header">
            <div className="">View</div>
            <div className="col-2-mng">Student Name</div>
            <div className="col-2-mng">Roll No.</div>
            <div className="col-3-mng">Date</div>
          </div>
          {/* Report Table Rows */}
          <div className="report-form-row-block">
            {data.map((item, index) => {
              return (
                <div key={index} className="report-form-row">
                  <div className="" onClick={() => handleOnOpenModal(item)}>
                    <RemoveRedEyeIcon sx={{ cursor: "pointer" }} />
                  </div>
                  <div className="col-2-mng">{item?.student?.name}</div>
                  <div className="col-2-mng">{item.student?.roll}</div>
                  <div className="col-3-mng">
                    {item.createdAt.slice(0, 10).split("-").reverse().join("-")}
                  </div>
                </div>
              );
            })}
            {data.length === 0 && (
              <div className="report-form-row">
                <div className="">No Student has been registered yet.</div>
              </div>
            )}
          </div>
        </div>
      </div>
      {modal && (
        <Modal
          header="Records"
          handleClose={onOffModal}
          children={<RecordModal selectedHistory={selectedHistory} />}
        />
      )}

      {allRecordsModal && (
        <Modal
          header="All Records"
          handleClose={onOffAllRecordsModal}
          children={<StudentAllFiles selectedAllDetails={selectedAllDetails} />}
        />
      )}

      <ToastContainer />
    </div>
  );
}

export default Record;
