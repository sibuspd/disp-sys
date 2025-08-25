import React, { useState } from "react";
import "./login.css";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ForgotModal from "../../components/ForgotModal/ForgotModal";

function Login(props) {

  const navigate = useNavigate();
  const [loginField, setLoginField] = useState({ email: "", password: "" });
  const [registerField, setRegisterField] = useState({
    name: "",
    rollno: "",
    email: "",
    password: "",
  });
  const [forgotPassword, setForgotPassword] = useState(false);

  // Toggle the Modal ON and OFF
  const handleForgotModal = () =>{
    setForgotPassword(prev=> !prev)
  }

  const handleOnChange = (event, key, card) => {
    if (card === "login")
      setLoginField({ ...loginField, [key]: event.target.value });
    else setRegisterField({ ...registerField, [key]: event.target.value });
  };

  const handleLogin = async() => {
    if (loginField.email.trim() === "" || loginField.password.trim() === "")
      return toast.error("Please enter the Login Credentials ");

    props.showLoader();

    await axios.post('${import.meta.env.VITE_BACKEND_URL}/api/auth/login', loginField, {withCredentials: true})
    .then( (response) => {
      console.log(response);

      // Storing token and user info in local storage
      localStorage.setItem('token', response.data.token); // Storing token for session management
      localStorage.setItem('userInfo', JSON.stringify(response.data.user)); // Converting object to string for storing in local storage
      localStorage.setItem('isLogin', true); // Storing login status in local storage under key 'isLogin'

      props.handleLogin(true);   // Passing login status to parent component

      //Redirecting user after successful login
      if(response.data.user.role === 'student'){
        navigate(`/student/${response.data.user._id}`);
      }
      else{
        navigate('/admin/dashboard');
      }
    })
    .catch(err => {
      console.log(err);
      toast.error(err?.response?.data?.error)
    })
    .finally(()=>{
      props.hideLoader();
    });
  }

  const handleRegister = async() => {
    if(registerField.email.trim() === "" || registerField.password.trim() === "" || registerField.name.trim() === "" || registerField.roll.trim() === "")
      return toast.error("Please enter all credentials");
    if(registerField.name.length < 3) return toast.error('Name should be at least 3 characters long');
    
    props.showLoader();

    await axios.post('${import.meta.env.VITE_BACKEND_URL}/api/auth/register',registerField)
    .then(response => {
      console.log(response);
      toast.success("User registered successfully");
    })
    .catch(err=>{
      toast.error(err?.response?.data?.error);
    })
    .finally(()=> {
      props.hideLoader();
    });
  };

  return (
    <div className="login-page">
      {/* Login Page */}
      <div className="login-page-card">
        <div className="card-header-form">Login</div>
        <div className="form-input-fields">
          <input
            type="email"
            className="form-input"
            placeholder="Enter email id"
            value={loginField.email}
            onChange={(event) => handleOnChange(event, "email", "login")}
          />
          <input
            type="password"
            className="form-input"
            placeholder="Password"
            value={loginField.password}
            onChange={(event) => handleOnChange(event, "password", "login")}
          />
          <div className="form-btn" onClick={handleLogin}>Login</div>
        </div>

        <div className="forgot-password-link" onClick={handleForgotModal}>Forgot Password ?</div>
      </div>
      {/* SignUp Form */}
      <div className="signup-page-card">
        <div className="card-header-form">Register</div>
        <div className="form-input-fields">
          <input
            type="text"
            className="form-input"
            placeholder="Enter your name"
            value={registerField.name}
            onChange={(event) => handleOnChange(event, "name", "register")}
          />
          <input
            type="text"
            className="form-input"
            placeholder="Enter your roll no."
            value={registerField.roll}
            onChange={(event) => handleOnChange(event, "roll", "register")}
          />
          <input
            type="email"
            className="form-input"
            placeholder="Enter your email id"
            value={registerField.email}
            onChange={(event) => handleOnChange(event, "email", "register")}
          />
          <input
            type="password"
            className="form-input"
            placeholder="Enter your password"
            value={registerField.password}
            onChange={(event) => handleOnChange(event, "password", "register")}
          />
          <div className="form-btn" onClick={handleRegister}>Register</div>
        </div>
      </div>

      <ToastContainer />

      {/* Conditional Rendering of Forgot Password Modal */}
      {forgotPassword && <ForgotModal showLoader={props.showLoader} hideLoader={props.hideLoader} closeModal={handleForgotModal}/>}
    </div>
  );
}

export default Login;
