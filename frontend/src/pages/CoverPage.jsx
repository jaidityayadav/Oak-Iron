import React from "react";
import "../css/cover.css"
import coverImage from "../assets/images/cover.jpg";
import { NavLink } from "react-router-dom";

const CoverPage = () => {
  return (

    <div
      className="cover-page"
      style={{
        backgroundImage: `url(${coverImage})`,
      }}
    >
      <div></div>
      <div className="banner-card">
        <div>
          <h1>Oak & Iron</h1>
        </div>
        <div>
          <h2>Where the finest furniture is crafted</h2>
        </div>
        <div className="cover-nav">
          <NavLink to={"/Home"}>
            <div className="button">
              Visit Store
            </div>
          </NavLink>
          <NavLink to={"/Login"}>
            <div className="button">
              Signup / Login
            </div>
          </NavLink>
        </div>
      </div>

      <div className="footer">
        <p>&copy;2024 Oak & Iron</p>
      </div>
    </div>
  );
};


export default CoverPage;