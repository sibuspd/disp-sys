import React, { useState, useEffect } from "react";
import "./manageEvent.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

function ManageEvent(props) {
  const [title, setTitle] = useState(""); // For handling the current value in Title field
  const [data, setData] = useState([]); // For fetching the notifications from backend

  const fetchData = async () => {
    props.showLoader();
    await axios
      .get("http://localhost:4000/api/notification/get")
      .then((response) => {
        setData(response.data.notifications);
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

  const handleSubmitEvent = async(e)=>{
    e.preventDefault();
    if(title.trim().length === 0) return toast.error("Please enter a title");
    props.showLoader();
    await axios.post('http://localhost:4000/api/notification/add', {title}, {withCredentials: true})
    .then((response) => {
      setData([response.data.notification, ...data]);
      toast.success(response.data.message);
      setTitle('');
    })
    .catch((err) => {
      toast.error(err?.response?.data?.error);
    })
    .finally(() => {
      props.hideLoader();
    })      
  }

  const filterOutEvent = (id) => {
    let newArr = data.filter((item) => item._id !== id);
    setData(newArr);
  };

  const handleDeleteEvent = async(id) =>{
    props.showLoader();
    await axios.delete(`http://localhost:4000/api/notification/delete/${id}`, {withCredentials: true})
    .then((response) => {
      toast.success(response.data.message);
      filterOutEvent(id);
    })
    .catch((err) => {
      toast.error(err?.response?.data?.error);
    })
    .finally(() => {
      props.hideLoader();
    })
  }

  return (
    <div className="add-staffs-box">
      {/* Input Form */}
      <form onSubmit={(e)=>handleSubmitEvent(e)} className="register-form">
        <div className="">
          <div className="register-input-box">
            <input
              className="input-box-register mngEventInp"
              type="text"
              placeholder="Write about the event"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
          </div>
        </div>
        <button type="submit" className="form-btn reg-btn">
          Add Event
        </button>
      </form>

      <div className="list-staffs">
        {data.map((item, index) => {
          return (
            <div key={index} className="list-staff">
              <div>{item.title.slice(0,60)}...</div>
              <div className="list-staff-btns">
                <div style={{ cursor: "pointer" }}>
                  <EditIcon />
                </div>
                <div style={{ cursor: "pointer" }}
                onClick={()=> handleDeleteEvent(item._id)}>
                  <DeleteIcon />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ToastContainer />
    </div>
  );
}

export default ManageEvent;
