import React, {useState} from 'react'
import './stock.css'
import SearchBox from '../../components/SearchBox/SearchBox'
import TableComp from '../../components/Table/TableComp'

function Stock() {

  const [medicineName, setMedicineName] = useState("");
  const headers = ["Sr No.", "Name", "Quantity", "Usage"];
  const rowData = [{ // An array of objects
    sno: 1,
    name: "Paracetamol",
    quantity: 27,
    usage: "Fever"
  },];

  const handleInputChange = (value) => {
    setMedicineName(value);
  }
  return (
    <div className='stock-page'>
      <SearchBox placeholder="Search Medicine" value={medicineName} onChange={handleInputChange}/>
      <div className="stock-page-card">
        <TableComp header={headers} data={rowData}/>
      </div>
    </div> 
  )
}

export default Stock