import React, { useState, useEffect } from "react";
import "./header.css";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import {toast, ToastContainer} from 'react-toastify';
function Header(props) {
  const [eventpopup, setEventpopup] = useState(false);
  const [helpline, setHelpline] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  }
  
  const handleLogout = async() => {
    props.showLoader();

    await axios.post('http://localhost:4000/api/auth/logout',{},{withCredentials: true})
    .then((response) => {
      console.log(response);
      props.handleLogin(false);

      localStorage.clear();
      navigate('/');
    })
    .catch(err => {
      console.log(err);
      toast.error(err?.response?.data?.error);
    })
    .finally(() =>{
      props.hideLoader();
    })
  }

  const handleOpenPopup = (popup) => {
    if (popup === "event") {
      setEventpopup(true);
    } else {
      setHelpline(true);
    }
  };

  const handleClosePopup = (popup) => {
    if (popup === "event") {
      setEventpopup(false);
    } else {
      setHelpline(false);
    }
  };

  return (
    <div className="header">
      {/* Header College Details */}
      <div className="header-college-details">
        <div className="header-college-details-left">
          <img
            className="header-college-details-left-logo"
            alt=""
            src="https://static.vecteezy.com/system/resources/previews/018/902/537/original/university-college-school-badge-logo-design-image-education-badge-logo-design-university-high-school-emblem-free-vector.jpg"
          />
          <div>
            <div className="header-college-details-name">ଗଙ୍ଗାଧର ମେହେର</div>
            <div className="header-college-details-place">
              ସ୍ୱୟଂଶାସିତ ବିଦ୍ୟାଲୟ
            </div>
            <div className="header-college-details-name">
              GM Autonomous College,{" "}
            </div>
            <div className="header-college-details-place">
              Sambalpur, Odisha
            </div>
          </div>
        </div>
        <div className="header-college-details-right">
          <div className="header-college-social-media">
            <a
              target="_blank"
              href="https://www.youtube.com/@nationalinstituteoftechnol7593"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/128/3670/3670147.png"
                className="header-social-media-image"
              />
            </a>
            <a target="_blank" href="https://www.facebook.com/nitukofficial/">
              <img
                src="https://cdn-icons-png.flaticon.com/128/733/733547.png"
                className="header-social-media-image"
              />
            </a>
            <a target="_blank" href="https://x.com/NIT_Uttarakhand">
              <img
                src="https://cdn-icons-png.flaticon.com/128/5968/5968830.png"
                className="header-social-media-image"
              />
            </a>
            <a
              target="_blank"
              href="https://www.instagram.com/nitukofficial?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            >
              <img
                src="https://th.bing.com/th/id/OIP.0wjhvLpjGf_-r-1lqG3QAQHaHw?rs=1&pid=ImgDetMain"
                className="header-social-media-image"
              />
            </a>
          </div>
          <input type="text" className="header-input-tags" />
        </div>
      </div>

      {/* NAVBAR */}
      <div className="navbar">
        <Link
          to={"/"}
          className={`navbar-links ${
            location.pathname === "/" ? "active-link" : null
          }`}
        >
          Home
        </Link>
        <div
          to={"/login"} onClick={props.isLogin? handleLogout : handleLogin}
          className={`navbar-links ${
            location.pathname === "/login" ? "active-link" : null
          }`}
        >{props.isLogin ? "Logout" : "Login"}
        </div>
        <Link
          to={"/stock"}
          className={`navbar-links ${
            location.pathname === "/stock" ? "active-link" : null
          }`}
        >
          Stock View
        </Link>
        <div
          className="navbar-links event-link"
          onMouseEnter={() => {
            handleOpenPopup("event");
          }}
          onMouseLeave={() => {
            handleClosePopup("event");
          }}
        >
          <div className="navbar-link-opt">
            New Events <ArrowDropDownIcon />
          </div>
          {eventpopup && (
            <div className="navbar-dropdown-popup event-pop">
              <div className="popup-notification">Christmas Celebration</div>
              <div className="popup-notification">Diwali Celebration</div>
            </div>
          )}
        </div>
        <div
          className="navbar-links event-link"
          onMouseEnter={() => {
            handleOpenPopup("helpline");
          }}
          onMouseLeave={() => {
            handleClosePopup("helpline");
          }}
        >
          <div className="navbar-link-opt">
            Helpline <ArrowDropDownIcon />
          </div>
          {helpline && (
            <div className="navbar-dropdown-popup helpline-pop">
              <div className="popup-notification">Disaster Management: 1007</div>   
            </div>
          )}
        </div>
      </div>
      {/* College Banner rendering on condition*/}
      {location.pathname === "/" &&
      <div className="header-banner">
        <img
          src={"https://www.gmuniversity.ac.in/images/slider/banner.jpg"}
          className="header-banner-image"
        />
      </div>
      }

      <ToastContainer/>
    </div>
  );
}

export default Header;
