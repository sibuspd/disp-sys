import React from 'react'
import "./staff.css"
import TableComp from '../Table/TableComp'
import { useEffect, useState } from 'react'
// import axios from 'axios'


function Staff() {

   const staffHeader = ["Name", "Designation", "Email Id", "Contact No."]
   const [rowData, setRowData] = useState([
    {
      name: "Prof. Sabyasachi Sahani",
      designation: "CS Expert",
      emailId: "sibuspd@gmail.com",
      contactNo: "8234008357"
    },
    {
      name: "Emr. Anurag Modak",
      designation: "DM Manager",
      emailId: "anuragx20@ximb.com",
      contactNo: "3403985986"
    }
   ]);

  return (
    <div className='staff'>
      <TableComp header={staffHeader} data={rowData} />
    </div>
    
  )
}
 
export default Staff