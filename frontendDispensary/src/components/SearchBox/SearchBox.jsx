import React from 'react'
import './searchBox.css'
import SearchIcon from '@mui/icons-material/Search';

function SearchBox(props) {

  const placeholder = props.placeholder?props.placeholder:"Enter keywords";
  const value = props.value?props.value:"";

  const handleOnChange = (event) => {
    if(props.onChange)
      props.onChange(event.target.value); // Refers to the parent function handleInputChange
  }

  return (
    <div className="page-searchBox">
        <input type="text" className="input-box" placeholder={placeholder} value={value}
        onChange={(e)=> handleOnChange(e)}/>
        <div className="search-btn"><SearchIcon/></div>
    </div>        
  )
}

export default SearchBox