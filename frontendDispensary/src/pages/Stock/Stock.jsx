import React, {useState, useEffect} from 'react'
import './stock.css'
import SearchBox from '../../components/SearchBox/SearchBox'
import TableComp from '../../components/Table/TableComp'
import axios from 'axios'
function Stock(props) {

  const [medicineName, setMedicineName] = useState("");
  const [stocks, setStocks] = useState([]); // For grabbing the medicine array list

  const headers = ["Sr No.", "Name", "Quantity", "Usage"];

  // The below sample data was only for testing purpose in the Tabular display
  // const rowData = [{ // An array of objects
  //   srNo: 1,
  //   name: "Paracetamol",
  //   quantity: 27,
  //   usage: "Fever"
  // },];

  const handleInputChange = (value) => {
    setMedicineName(value);
  }

  const getFormattedData = (data) => {
    let newArr = data.map( (item, ind) => {
      return { srNo: ind+1, name: item.name, quantity: item.quantity, usage: item.usage}
    });
    setStocks(newArr);
  }

  const fetchData = async () => {
    props.showLoader();
    await axios.get(`http://localhost:4000/api/medicine/search-by-name?name=${medicineName}`)
    .then((response)=>{
      //Validation
      if(response.data.medicines.length === 0){
        setStocks([]);
      }
      getFormattedData(response.data.medicines);


    })
    .catch(err=>{
      console.log(err);
    })
    .finally(()=>{
      props.hideLoader();
    });
  }

  // When a specific medicine name is specified in the search box
  useEffect(()=>{
    fetchData();
  }, [medicineName]);

  return (
    <div className='stock-page'>
      <SearchBox placeholder="Search Medicine" value={medicineName} onChange={handleInputChange}/>
      <div className="stock-page-card">
        <TableComp header={headers} data={stocks}/>
      </div>
    </div> 
  )
}

export default Stock