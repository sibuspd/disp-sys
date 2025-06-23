import React, {useState}  from "react";
import "./adminGallery.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddModal from "./AddModal/AddModal"
import DeleteModal from "./DeleteModal/DeleteModal";
const AdminGallery = () => {

  const [addModal, setAddModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const setAddModalFunc = () => { 
    setAddModal( prev => !prev);
  }
  const setDeleteModalFunc = () => { 
    setDeleteModal( prev => !prev);
  }
  return (
    <div className="gallery-admin">
      <div className="go-back">
        <Link to="/admin/dashboard">
          <ArrowBackIcon /> Back to Dashboard
        </Link>
      </div>

      <div className="add-pic-gallery-btn" onClick={setAddModalFunc}>Add Image</div>

      <div className="gallery-home">
              <div className="gallery-home-image-block img-admin" onClick={setDeleteModalFunc}>
        <img
          src="https://images.shiksha.com/mediadata/images/1533047671phpkiV8YS.jpeg"
          alt=""
          className="gallery-home-image"
        />
      </div>
      <div className="gallery-home-image-block img-admin"onClick={setDeleteModalFunc}>
        <img
          src="https://ik.imagekit.io/syustaging/SYU_PREPROD/Gangadhar-Meher-University-_Sambalpur-_Orissa_PBiQ9BYKV.webp?tr=w-3840"
          alt=""
          className="gallery-home-image"
        />
      </div>
      <div className="gallery-home-image-block img-admin" onClick={setDeleteModalFunc}>
        <img
          src="https://files.yappe.in/place/full/gangadhar-meher-university-10958974.webp"
          alt=""
          className="gallery-home-image"
        />
      </div>
      <div className="gallery-home-image-block img-admin" onClick={setDeleteModalFunc}>
        <img
          src="https://admission.icnn.in/wp-content/uploads/2021/09/Gang-567x375.jpg"
          alt=""
          className="gallery-home-image"
        />
      </div>
      <div className="gallery-home-image-block img-admin" onClick={setDeleteModalFunc}>
        <img src="https://www.gmuniversity.ac.in/dept/gallery/gallery1720024136.jpg" alt="" className="gallery-home-image" />
      </div>{" "}
      <div className="gallery-home-image-block img-admin" onClick={setDeleteModalFunc}>
        <img
          src="https://files.yappe.in/place/full/gangadhar-meher-university-10958972.webp"
          alt=""
          className="gallery-home-image"
        />
      </div>
      </div>
      {addModal && <AddModal onClose={setAddModalFunc}/>}
      {deleteModal && <DeleteModal onClose={setDeleteModalFunc}/>}
      
    </div>
  );
};

export default AdminGallery;
