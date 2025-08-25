import React from "react";
import "./forgotModal.css";
import { useState } from "react";
import {toast, ToastContainer} from 'react-toastify';
import axios from 'axios';

const ForgotModal = (props) => {

    const [step, setStep] = useState(1); // For dynamic display of OTP field and New Password field
    const [buttonText, setButtonText] = useState('Send OTP'); // For dynamic Submit button
    const [inputField, setInputField] = useState({email:"", otp:"", newPassword:""}); // Fo extracting data from input fields

    const handleOnChange = (event, key) => {
        setInputField({...inputField, [key]: event.target.value}); // Key represents the property to be updated
    }
    const sendOTPToMail = async () => {
        // Validation for input fields
        if(inputField.email.trim().length === 0) return toast.error("Please enter email address");
        // Send OTP to email
        props.showLoader();
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/send-otp`, {email: inputField.email})
        .then((response)=>{
            console.log(response);
            setStep(2);
            setButtonText('Enter the OTP');
            alert(response.data.message);
        })
        .catch(err=>{
            alert(err?.response?.data?.error);
        })
        .finally(()=>{
            props.hideLoader();
        })

    }

    const checkOtp = async () => {
        //Validation
        if(inputField.otp.trim().length === 0) return toast.error('Please enter OTP');
        // Verify the OTP 
        props.showLoader();
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/verify-otp`,{email: inputField.email, otp: inputField.otp}) //Sending email and otp from frontend input fields to backend
        .then((response)=>{
            setStep(3);
            setButtonText('Update Password');
            alert(response.data.message);
        })
        .catch(err => {
            alert(err?.response?.data?.error);
        })
        .finally(() => {
            props.hideLoader();
        })
    }

        const resetPassword = async() => {
        // Validation
        if(inputField.newPassword.trim().length === 0) return toast.error("Please enter a valid new password");
        // Update the password
        props.showLoader();
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/reset-password`, {email: inputField.email, newPassword: inputField.newPassword})
        .then((response) => {
            alert(response.data.message);
            // Closing the ForgotModal
            props.closeModal();
        })
        .catch(err => {
            alert(err?.response?.data?.error);
        })
        .finally(() => {
            props.hideLoader();
        })
    }
const handleForgotBtn = async() => {
    if(step === 1)
        await sendOTPToMail();
    else if (step === 2)
        await checkOtp();
    else if (step === 3)
        await resetPassword();
}
    
  return (
    // Overall Container
    <div className="forgot-password-modal">
        {/* Main Modal Box */}
        <div className="signup-page-card">
            <div className="card-header-form">
                Reset Password
            </div>

            {/* Form input fields */}
            <div className="form-input-fields">
                <input type="email" className="form-input" placeholder="Enter Email Address" value={inputField.email} onChange={(e)=>handleOnChange(e, 'email')} disabled={step!==1} />
                {(step === 2 || step === 3) && <input type="text" className="form-input" placeholder="Enter OTP" value={inputField.otp} onChange={(e)=>handleOnChange(e, 'otp')} disabled={step!==2} />}
                {step === 3 && <input type="password" className="form-input" placeholder="New Password" value={inputField.newPassword} onChange={(e)=>handleOnChange(e, 'newPassword')}/>}
            </div>

            <div className="form-btn forgot-password-btn" onClick={handleForgotBtn}>{buttonText}</div>
            <div className="form-btn forgot-password-btn" onClick={() => props.closeModal()}>Cancel</div>
        </div>

        <ToastContainer/>
    </div>
  ) 
};

export default ForgotModal;
