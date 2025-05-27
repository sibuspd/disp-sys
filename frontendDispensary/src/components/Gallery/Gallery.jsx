import React from "react";
import "./gallery.css";

function Gallery() {
  return (
    <div className="gallery-home">
      <div className="gallery-home-image-block">
        <img
          src="https://images.shiksha.com/mediadata/images/1533047671phpkiV8YS.jpeg"
          alt=""
          className="gallery-home-image"
        />
      </div>
      <div className="gallery-home-image-block">
        <img
          src="https://ik.imagekit.io/syustaging/SYU_PREPROD/Gangadhar-Meher-University-_Sambalpur-_Orissa_PBiQ9BYKV.webp?tr=w-3840"
          alt=""
          className="gallery-home-image"
        />
      </div>
      <div className="gallery-home-image-block">
        <img
          src="https://files.yappe.in/place/full/gangadhar-meher-university-10958974.webp"
          alt=""
          className="gallery-home-image"
        />
      </div>
      <div className="gallery-home-image-block">
        <img
          src="https://admission.icnn.in/wp-content/uploads/2021/09/Gang-567x375.jpg"
          alt=""
          className="gallery-home-image"
        />
      </div>
      <div className="gallery-home-image-block">
        <img src="https://www.gmuniversity.ac.in/dept/gallery/gallery1720024136.jpg" alt="" className="gallery-home-image" />
      </div>{" "}
      <div className="gallery-home-image-block">
        <img
          src="https://files.yappe.in/place/full/gangadhar-meher-university-10958972.webp"
          alt=""
          className="gallery-home-image"
        />
      </div>
    </div>
  );
}

export default Gallery;
