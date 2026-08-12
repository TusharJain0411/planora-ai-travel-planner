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
  

 
      <div className={`login-register-right`}>
        <button className="close-btn" onClick={closeModal}>
          <FaTimes />
        </button>
        <Login_register_card />
      </div>
    
  );
}

export default Login_register;
