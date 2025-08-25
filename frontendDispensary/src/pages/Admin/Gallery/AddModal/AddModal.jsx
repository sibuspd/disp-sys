import React, { useState } from "react";
import "./addModal.css";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { toast, ToastContainer } from "react-toastify";

const AddModal = (props) => {
  const [image, setImage] = useState(null); // State management of uploaded image
  const [loader, setLoader] = useState(false);

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);

    data.append("upload_preset", "college-dispensary_system");
    setLoader(true);
    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dwjbwk62x/image/upload",
        data
      );
      const imageUrl = response.data.url; // Cloud url generated for uploaded image
      setImage(imageUrl); // Image state variable will hold the Image URL
    } catch (err) {
      console.log(err);
    } finally {
      setLoader(false);
    }
  };

  const handleSubmit = async () => {
    await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/gallery/add`, {link:image},{withCredentials: true})
    .then((response) => {
      window.location.reload(); // Reload the page to see the new image
    })
    .catch((err) => {
      toast.error(err?.response?.data?.message);
    });
  }

  return (
    <div className="addModal">
      <div className="addModal-card">
        <div>Add Images</div>
        <div className="modal-add-btns">
          <div className="cancel-modal-btn" onClick={() => props.onClose()}>
            Cancel
          </div>

          <label htmlFor="fileInput" className="cancel-modal-btn">
            Upload
          </label>
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            className="cancel-file"
            onChange={(e) => uploadImage(e)}
          />
        </div>
        {loader && (
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        )}
        {image && <img src={image} style={{width:"300px", height:"300px", marginTop:"20px"}}/>}
        {image && <div className="cancel-modal-btn" onClick={handleSubmit}>Submit</div>}
      </div>

      <ToastContainer />
    </div>
  );
};

export default AddModal;

// preset-name = college-dispensary_system
// cloud name = dwjbwk62x
