import './App.css'
import Header from './components/Header/Header'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Footer from './components/Footer/Footer'
import Login from './pages/Login/Login'
import Stock from './pages/Stock/Stock'
import AdminDashboard from './pages/Admin/Dashboard/AdminDashboard'
import RegisterStudent from './pages/Admin/RegisterStudent/RegisterStudent'
import ManageMedicine from './pages/Admin/ManageMedicine/ManageMedicine'
import Record from './pages/Admin/Records/Record'
import Facility from './pages/Admin/Facility/Facility'
import NearByHospital from './pages/Admin/NearByHospital/NearByHospital'
import AdminGallery from './pages/Admin/Gallery/AdminGallery'
import StudentDashboard from './pages/Student/StudentDashboard'
import GlobalLoader from './components/GlobalLoader/GlobalLoader'
import { useState } from 'react'

function App() {

  const [loader, setLoader] = useState(false);

  const showLoader = () => {
    setLoader(true);
  }

  const hideLoader = () => {
    setLoader(false);
  }

  return (
    <div className='App'>
      <Header/>
      <Routes>
        <Route path="/" element={<Home  showLoader={showLoader} hideLoader={hideLoader} />}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/stock" element={<Stock/>}/>
        <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
        <Route path="/admin/register-student" element={<RegisterStudent/>}/>
        <Route path="/admin/manage-medicine" element={<ManageMedicine/>}/>
        <Route path="/admin/record" element={<Record/>}/>
        <Route path="/admin/facility" element={<Facility/>}/>
        <Route path="/admin/nearby-hospital" element={<NearByHospital/>}/>
        <Route path="/admin/gallery" element={<AdminGallery/>}/>
        <Route path="/student/:id" element={<StudentDashboard/>}/> // dynamic id
      </Routes>
      <Footer/>

      {/* Conditional Rendering of Loader */}
      {loader && <GlobalLoader/>}     
    </div>
  ) 
}

export default App
