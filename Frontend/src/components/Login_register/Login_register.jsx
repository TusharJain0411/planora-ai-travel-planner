import React, { useState } from "react";
import {
  FaPlaneDeparture,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGithub,
  FaGoogle,
  FaStar,
  FaGlobe,
  FaTimes,
} from "react-icons/fa";

import "../../CSS/Login_register.css";
import Login from "./Login_register_card.jsx";
import Login_register_card from "./Login_register_card.jsx";
import { setOpenLogin } from "../../Redux/Slice/CommonStatesSlice.js";


function Login_register({ closeModal }) {




  return (
    <div className="login-register-page">
      {/* LEFT SECTION */}
      <div className="login-register-left">
        <div className="overlay"></div>

        <div className="left-content">
          <h1>
            Your Next <br />
            Adventure Starts <br />
            Here.
          </h1>

          <p>
            Sign in to continue planning personalized AI-powered journeys,
            manage saved trips, and explore the world smarter.
          </p>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className={`login-register-right`}>
        <button className="close-btn" onClick={closeModal}>
          <FaTimes />
        </button>
        <Login_register_card />
      </div>
    </div>
  );
}

export default Login_register;
