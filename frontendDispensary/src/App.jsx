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

function App() {

  return (
    <div className='App'>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/stock" element={<Stock/>}/>
        <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
        <Route path="/admin/register-student" element={<RegisterStudent/>}/>
        <Route path="/admin/manage-medicine" element={<ManageMedicine/>}/>
        <Route path="/admin/record" element={<Record/>}/>
        <Route path="/admin/facility" element={<Facility/>}/>
      </Routes>
      <Footer/>
    </div>
  ) 
}

export default App
