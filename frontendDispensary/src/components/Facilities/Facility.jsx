import React from "react";
import "./facility.css";
import { useState, useEffect } from "react";
import axios from "axios";
function Facility() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    await axios
      .get("http://localhost:4000/api/facility/get")
      .then((response) => {
        setData(response.data.facilities);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="facility">
      <div className="facility-header">
        list of facilities available at GM College Health Centre
      </div>
      <div className="facility-lists">
        {/* conditional rendering */}
        {data.map((item, index) => {
          return (
            <div className="facility-list">
              <div className="facility-list-header">{item.title}</div>
              <p className="facility-list-value">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Facility;
