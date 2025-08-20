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

  const handleClick = () => { // Will work when user clicks on search icon
    if(props.handleClick) // Checks if handleClick prop is passed
      props.handleClick(); // It calls the handleSearch function in parent component RegisterStudent.jsx
  }

  return (
    <div className="page-searchBox">
        <input type="text" className="input-box" placeholder={placeholder} value={value}
        onChange={(e)=> handleOnChange(e)}/>
        <div className="search-btn" onClick={handleClick}><SearchIcon/></div>
    </div>        
  )
}

export default SearchBox