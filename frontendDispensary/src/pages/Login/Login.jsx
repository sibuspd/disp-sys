import React, {useState} from 'react'
import './login.css'

function Login() {

  const [loginField, setLoginField] = useState({email: "", password: ""});
  const [registerField, setRegisterField] = useState({name: "", rollno: "", email: "", password: ""});

  const handleOnChange = (event, key, card) => {
    if(card === "login")
    setLoginField({...loginField, [key]: event.target.value});
  else
  setRegisterField({...registerField, [key]: event.target.value});
  }

  return (
    <div className="login-page">
      {/* Login Page */}
      <div className="login-page-card">
        <div className="card-header-form">Login</div>
        <div className="form-input-fields">
          <input type="email" className="form-input" placeholder='Enter email id' value={loginField.email}
          onChange={(event) => handleOnChange(event,'email','login' )} />
          <input type="password" className="form-input" placeholder='Password' value={loginField.password}
          onChange={(event) => handleOnChange(event,'password','login' )}/>
          <div className="form-btn">Login</div>
        </div>

        <div className="forgot-password-link">Forgot Password ?</div>
      </div>
      {/* SignUp Form */}
                  <div className='signup-page-card'>
                <div className='card-header-form'>Register</div>
                <div className='form-input-fields'>
          <input type="text" className="form-input" placeholder='Enter your name'
          value={registerField.name}
          onChange={(event) => handleOnChange(event,'name','register' )}/>
          <input type="text" className="form-input" placeholder='Enter your roll no.'
          value={registerField.roll}
          onChange={(event) => handleOnChange(event,'roll','register' )}/>
          <input type="email" className="form-input" placeholder='Enter your email id'
          value={registerField.email}
          onChange={(event) => handleOnChange(event,'email','register' )}/>
          <input type="password" className="form-input" placeholder='Enter your password'
          value={registerField.password}
          onChange={(event) => handleOnChange(event,'password','register' )}/>
          <div className="form-btn">Register</div>
                </div>
            </div>
    </div>   
  )
}

export default Login