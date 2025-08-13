import React from 'react'
import "./staff.css"
import TableComp from '../Table/TableComp'
import { useEffect, useState } from 'react'
import axios from 'axios'
// import axios from 'axios'


function Staff(props) {

   const staffHeader = ["Name", "Designation", "Email Id", "Contact No."]
   const [rowData, setRowData] = useState([]);

   const getFormattedData = (data) => {
     let newarr = data.map((item) => {
      return {name: item.name, designation: item.designation, email: item.email, contactNo: item.mobileNo}; // Return an object
     });
     setRowData(newarr);
   }

   const fetchData = async() => {

    props.showLoader(); // Initially set Loading to true when the data is being fetched
    
    await axios.get('http://localhost:4000/api/auth/get-staff') // axios.get() returns a promise
    .then((response) => { 
      getFormattedData(response.data.staffs); // Takes an array of objects as an argument
    })
    .catch((error) => { console.log(error) })
    .finally( ()=> {
      props.hideLoader(); // Set Loading to false after data is fetched
    });
   }

   useEffect(()=> {
    fetchData(); // Call the async function inside useEffect for pre-rendering the data
   }, []);

  return (
    <div className='staff'>
      <TableComp header={staffHeader} data={rowData} />
    </div>
    
  )
}
 
export default Staff