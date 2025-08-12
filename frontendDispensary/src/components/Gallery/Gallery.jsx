import React, { useState, useEffect } from "react";
import "./gallery.css";
import axios from "axios";

function Gallery() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("http://localhost:4000/api/gallery/get")
        .then((response) => {
          setData(response.data.images);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, []);
  return (
    <div className="gallery-home">
      {/* Data mapping */}
      {data.map((item, index) => {
        return (
          <div key={index} className="gallery-home-image-block img-admin">
            <img
              src={item.link}
              alt=""
              className="gallery-home-image"
            />
          </div>
        );
      })}
    </div>
  );
}

export default Gallery;
