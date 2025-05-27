import React, { useState } from "react";
import "./home.css";
import HomeIcon from "@mui/icons-material/Home";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import ImageIcon from "@mui/icons-material/Image";
import AboutUs from "../../components/AboutUs/AboutUs";
import Staff from "../../components/Staffs/Staff";
import Facility from "../../components/Facilities/Facility";
import NearByHospitals from "../../components/NearByHospitals/NearByHospitals";
import Gallery from "../../components/Gallery/Gallery";
import { Link } from "react-router-dom";

function Home(props) {
  const [page, setPage] = useState("About");
  let [rightSideHeader, setRightSideHeader] = useState("About Us");

  //Menu Options collection
  const handleChangeTab = (pagename) => {
    setPage(pagename);
    switch (pagename) {
      case "About":
        setRightSideHeader("About Us");
        break;
      case "Staff":
        setRightSideHeader("Our Staffs");
        break;
      case "Facilities":
        setRightSideHeader("Facilities");
        break;
      case "NearByHospitals":
        setRightSideHeader("Near By Hospitals");
        break;
      case "Gallery":
        setRightSideHeader("Gallery");
        break;
    }
  };

  const getComponent = () => {
    switch (page) {
      case "About":
        return <AboutUs />;
      case "Staff":
        return <Staff />;
      case "Facilities":
        return <Facility />;
      case "NearByHospitals":
        return <NearByHospitals />;
      case "Gallery":
        return (
          <Gallery
            showLoader={props.showLoader}
            hideLoader={props.hideLoader}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="home">
      <div className="home-block">
        <div className="home-left-page">
          {/* {userInfo && userInfo?.role !== "student" && (
            <Link to={"/admin/dashboard"} className={`home-left-option`}>
              <HomeIcon /> Dashboard
            </Link>
          )}
          {userInfo && userInfo?.role === "student" && (
            <Link
              to={`/student/${userInfo?._id}`}
              className={`home-left-option`}
            >
              <HomeIcon /> Profile
            </Link>
          )} */}

          <div
            className={`home-left-option ${
              page === "About" ? "active-opt" : null
            }`}
            onClick={() => {
              handleChangeTab("About");
            }}
          >
            <HomeIcon /> About Us
          </div>

          <div
            className={`home-left-option ${
              page === "Staff" ? "active-opt" : null
            }`}
            onClick={() => {
              handleChangeTab("Staff");
            }}
          >
            <HomeIcon /> Staffs
          </div>

          <div
            className={`home-left-option ${
              page === "Facilities" ? "active-opt" : null
            }`}
            onClick={() => {
              handleChangeTab("Facilities");
            }}
          >
            <HomeIcon /> Facilities
          </div>

          <div
            className={`home-left-option ${
              page === "NearByHospitals" ? "active-opt" : null
            }`}
            onClick={() => {
              handleChangeTab("NearByHospitals");
            }}
          >
            <HomeIcon /> Nearby Hospitals
          </div>

          <div
            className={`home-left-option ${
              page === "Gallery" ? "active-opt" : null
            }`}
            onClick={() => {
              handleChangeTab("Gallery");
            }}
          >
            <HomeIcon /> Gallery
          </div>
        </div>

        <div className="home-right-page">
          <div className="home-right-header">{rightSideHeader}</div>
          <div className="home-right-section">{getComponent()}</div>
        </div>
      </div>
    </div>
  );
}

export default Home;
