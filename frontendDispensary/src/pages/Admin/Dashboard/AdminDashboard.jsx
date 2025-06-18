// This page is structured under user heirarchy - Admin

import React, {useState, useEffect} from 'react'
import './adminDashboard.css'
import Modal from '../../../components/Modal/Modal'
import ManageStaff from './ManageStaff/ManageStaff'
import ManageEvent from './ManageEvent/ManageEvent'
import { Link } from 'react-router-dom'

function AdminDashboard() {

  const [manageStaffModal, setManageStaffModal] = useState(false);
  const [eventModal, setEventModal] = useState(false);
  const openCloseModal = (value) => { // Value represents different modals
    if(value === "event"){
      setEventModal(prev => !prev);
    }
    else // value is "staff"
    {
      setManageStaffModal(prev => !prev);
    }
  }

  // the following useEffects have been used to log the real-time values after a state update.
  useEffect(() => {
  console.log("Event modal is", eventModal);
}, [eventModal]);

useEffect(() => {
  console.log("Staff modal is", manageStaffModal);
}, [manageStaffModal]);

  return (
    <div className="adminDashboard">
      {/* Dashboard Header */}
      <div className="welcome-header">
        <div className="welcome-admin">
          Welcome to Admin Panel
        </div>
        <div className="welcome-admin-right-side">
          <div className="manage-staff-btn" onClick={() => openCloseModal("staff")}>Manage Staff</div>
          <div className="manage-staff-btn" onClick={() => openCloseModal("event")}>Events</div>
        </div>
      </div>

      {/* Dashboard Main Module */}
      <div className="admin-dashboard-cards">
        <Link to="/admin/register-student" className="admin-dashboard-card">
          Register Student
        </Link>
        <Link to="/admin/manage-medicine" className="admin-dashboard-card">
          Manage Medicines
        </Link>
        <Link to="/admin/record" className="admin-dashboard-card">
          Records
        </Link>        
        <div className="admin-dashboard-card">
          Facilities
        </div>        
        <div className="admin-dashboard-card">
          Nearby Hospitals
        </div>        
        <div className="admin-dashboard-card">
          Gallery
        </div>        
      </div>
      {manageStaffModal && <Modal header={"Manage Staff"} handleClose={openCloseModal} value={"staff"} children={<ManageStaff/>}/>}
      {eventModal && <Modal header={"Events"} handleClose={openCloseModal}  value={"event"}children={<ManageEvent/>}/>} // Passing prop for reference to callback openCloseModal
    </div>
  )
}

export default AdminDashboard