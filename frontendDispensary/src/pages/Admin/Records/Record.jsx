import React, {useState, useEffect} from "react";
import "./record.css";
import {Link} from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchBox from "../../../components/SearchBox/SearchBox";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Modal from "../../../components/Modal/Modal";
import RecordModal from "./RecordModal/RecordModal";

function Record() {

    const [studentRoll, setStudentRoll] = useState("");
    const [listOfYear, setListOfYear] = useState([]);
    const [listOfMonth, setListOfMonth] = useState([]);

    const currentYear = new Date().getFullYear();
    const [modal, setModal] = useState(false);

    const [selectedMonth, setSelectedMonth] = useState(""); // For highlighting current month
    const [selectedYear, setSelectedYear] = useState(""); // For highlighting current year

    const onOffModal = () => {
        setModal(prev => !prev);
    }

    const onChangeField = (value)  => {
        setStudentRoll(value);
    }

    const fetchData = async () => {

    }

    useEffect(() => { // When fetching data from backend
        if(selectedYear === "" || selectedMonth === "") return; 
        fetchData();
    }, [selectedYear, selectedMonth]); 

    useEffect( () => {
        // Logic for year 2025 and onwards
        let arr= [];
        for(let i=2025; i<= parseInt(currentYear); i++ ) // starts from 2025 and ends at current year beyond that.
            arr.unshift(i.toString()); // Adds incrementally from 0 to that year from right to left
        setListOfYear(arr); console.log(arr);
        setSelectedYear(arr[0]); // selects the latest year placed at the beginning of the array

        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const currentMonthIndex = new Date().getMonth();  // getMonth() returns 0 indexed based number corresponding to the current month
        const pastAndCurrentMonths = months.slice(0, currentMonthIndex + 1); // will contain a subset of the months array upto current month only
        setListOfMonth(pastAndCurrentMonths);
        setSelectedMonth(pastAndCurrentMonths[pastAndCurrentMonths.length -1]); // last element of the array
    }, []);

    const handleOnOpenModal = () => {
        setModal(prev => !prev);
    }

  return (
    <div className="records">
      <div className="go-back">
        <Link to="/admin/dashboard">
          <ArrowBackIcon /> Back to Dashboard
        </Link>
      </div>
{/* SearchBox */}
      <SearchBox value={studentRoll} onChange={onChangeField} placeholder="Search  by Roll No."/>
      {/* Years and Months display */}
      <div className="record-date-block">
        Select Year
        <div className="record-date-year">
          {
            listOfYear.map((item, index) => <div key={index} className={`record-year 
          ${item===selectedYear? `active-stats`:null}`} onClick={()=> setSelectedYear(item)}>
              {item}</div>)
          }
        </div>
        Select Month
        <div className="record-date-year">
          {
            listOfMonth.map((item, index) => <div key={index} className={`record-year 
              ${item===selectedMonth? `active-stats`:null}`} onClick={()=> setSelectedMonth(item)}>
                {item}</div>)
          }
            
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
            <div className="report-form-row">
              <div className="" onClick={()=> handleOnOpenModal()}><RemoveRedEyeIcon sx={{"cursor": "pointer"}}/></div>
              <div className="col-2-mng">Sabyasachi Sahani</div>
              <div className="col-2-mng">102993058</div>
              <div className="col-3-mng">{new Date().toDateString()}</div>
            </div>
            {/* Blank row */}
            <div className="report-form-row">
              <div className="">No Student has been registered yet.</div>
            </div>
          </div>
        </div>
      </div>
      {modal && <Modal header="Records" handleClose={onOffModal} children={<RecordModal/>}/>}
      
    </div>
  );
}

export default Record;
