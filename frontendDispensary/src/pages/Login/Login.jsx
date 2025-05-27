import React from 'react'
import './login.css'

function Login() {
  return (
    <div className="login-page">
      {/* Login Page */}
      <div className="login-page-card">
        <div className="card-header-form">Login</div>
        <div className="form-input-fields">
          <input type="email" className="form-input" placeholder='Enter email id'/>
          <input type="password" className="form-input" placeholder='Password'/>
          <div className="form-btn">Login</div>
        </div>

        <div className="forgot-password-link">Forgot Password ?</div>
      </div>
      {/* SignUp Form */}
                  <div className='signup-page-card'>
                <div className='card-header-form'>Register</div>
                <div className='form-input-fields'>
          <input type="text" className="form-input" placeholder='Enter your name'/>
          <input type="text" className="form-input" placeholder='Enter your roll no.'/>
          <input type="email" className="form-input" placeholder='Enter your email id'/>
          <input type="password" className="form-input" placeholder='Enter your password'/>
          <div className="form-btn">Register</div>
                </div>
            </div>
    </div>   
  )
}

export default Login