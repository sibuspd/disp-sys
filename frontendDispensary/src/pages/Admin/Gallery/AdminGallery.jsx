import React, { useState, useEffect } from "react";
import "./adminGallery.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import AddModal from "./AddModal/AddModal";
import DeleteModal from "./DeleteModal/DeleteModal";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
const AdminGallery = (props) => {
  const [addModal, setAddModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [data, setData] = useState([]); // This state can be used to store gallery images if needed
  const [clickedItem, setClickedItem] = useState(null); // State to hold the clicked image for deletion 
  const setAddModalFunc = () => {
    setAddModal((prev) => !prev);
  };
  const setDeleteModalFunc = (item=null) => {
    if(deleteModal){
      setClickedItem(null); // Reset clicked item when closing the delete modal
    } else{
      setClickedItem(item); // Set clicked item when opening the delete modal
    } 
    setDeleteModal((prev) => !prev);
  };

  const fetchData = async () => {
    props.showLoader();
    await axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/gallery/get`)
      .then((response) => {
        setData(response.data.images);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      })
      .finally(() => {
        props.hideLoader();
      });
  };

  useEffect(() => {
    fetchData();
  }, []); // For populating gallery images

  return (
    <div className="gallery-admin">
      <div className="go-back">
        <Link to="/admin/dashboard">
          <ArrowBackIcon /> Back to Dashboard
        </Link>
      </div>

      <div className="add-pic-gallery-btn" onClick={setAddModalFunc}>
        Add Image
      </div>

      <div className="gallery-home">
        {data.map((item, index) => {
          return (
            <div
              key={index}
              className="gallery-home-image-block img-admin"
              onClick={()=>setDeleteModalFunc(item)}
            >
              <img
                src={item.link}
                alt=""
                className="gallery-home-image"
              />
            </div>
          );
        })}{" "}
      </div>
      {addModal && <AddModal onClose={setAddModalFunc} />}
      {deleteModal && <DeleteModal onClose={setDeleteModalFunc} clickedItem={clickedItem} />}
      <ToastContainer />
    </div>
  );
};

export default AdminGallery;
