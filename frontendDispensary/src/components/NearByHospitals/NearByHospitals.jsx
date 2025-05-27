import React, { useState, useEffect } from "react";
import "./nearByHospitals.css";
import TableComp from "../Table/TableComp";
// import axios from 'axios'

function NearByHospitals() {
  const hosptalheaders = ["Sn No.", "Name", "Address", "Contact"];
  const [rowData, setRowData] = useState([
    {
      snNo: 1,
      name: "City Hospital Modipada",
      address: "Sambalpur, Odisha",
      contact: "1234567890",
    },
    {
      snNo: 2,
      name: "VSSMCH Burla",
      address: "Sambalpur, Odisha",
      contact: "1234567890",
    }
  ]);
  return (
    <div>
      <TableComp header={hosptalheaders} data={rowData} />
    </div>
  );
}

export default NearByHospitals;
