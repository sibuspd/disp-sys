import './App.css'
import Header from './components/Header/Header'
import { Routes, Route, Navigate } from 'react-router-dom'
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

  const [loader, setLoader] = useState(false); // For loading screen toggle
  const [isLogin, setIsLogin] = useState(localStorage.getItem('isLogin')); // Checking if user is logged in from local storage
  // isLogin will be either true or false based on the value in local storage

  //Conditional Routing for restricting Students to access Admin Routes
  let role = localStorage.getItem('userInfo')? JSON.parse(localStorage.getItem('userInfo')).role: null; // Extracting the role 
  let id = localStorage.getItem('userInfo')? JSON.parse(localStorage.getItem("userInfo"))._id: null; // Extracting the id
  const handleLogin = (value) => { // Value will be obtained from Login component
    setIsLogin(value); 
  }

  const showLoader = () => {
    setLoader(true);
  }

  const hideLoader = () => {
    setLoader(false);
  }

  return (
    <div className='App'>
      <Header isLogin={isLogin} showLoader={showLoader} hideLoader={hideLoader} handleLogin={handleLogin} />
      <Routes>
        <Route path="/" element={<Home  showLoader={showLoader} hideLoader={hideLoader} />}/>
        <Route path="/login" element={isLogin? role==="student"? <Navigate to={`/student/${id}`} />: <Navigate to={'/admin/dashboard'}/>: <Login showLoader={showLoader} hideLoader={hideLoader} handleLogin={handleLogin} />}/>
        <Route path="/stock" element={<Stock showLoader={showLoader} hideLoader={hideLoader} />}/>
        <Route path="/admin/dashboard" element={isLogin && role !== 'student'? <AdminDashboard showLoader={showLoader} hideLoader={hideLoader} />:<Navigate to="/"/>}/>
        <Route path="/admin/register-student" element={isLogin && role !== 'student'? <RegisterStudent showLoader={showLoader} hideLoader={hideLoader} />: <Navigate to="/"/>}/>
        <Route path="/admin/manage-medicine" element={isLogin && role !== 'student'? <ManageMedicine showLoader={showLoader} hideLoader={hideLoader} />: <Navigate to="/"/> }/>
        <Route path="/admin/record" element={isLogin && role !== 'student'? <Record showLoader={showLoader} hideLoader={hideLoader} />: <Navigate to="/"/> }/>
        <Route path="/admin/facility" element={isLogin && role !== 'student'? <Facility showLoader={showLoader} hideLoader={hideLoader} />: <Navigate to="/"/> }/>
        <Route path="/admin/nearby-hospital" element={isLogin && role !== 'student'? <NearByHospital showLoader={showLoader} hideLoader={hideLoader} />: <Navigate to="/"/> }/>
        <Route path="/admin/gallery" element={isLogin && role !== 'student'? <AdminGallery showLoader={showLoader} hideLoader={hideLoader} />: <Navigate to="/"/> }/>
        <Route path="/student/:id" element={isLogin && role === 'student'? <StudentDashboard showLoader={showLoader} hideLoader={hideLoader} />: <Navigate to="/"/> }/> // dynamic id
      </Routes>
        {/* Conditional Rendering of Loader */}
      {loader && <GlobalLoader/>}  
      <Footer/>   
    </div>
  ) 
}

export default App
