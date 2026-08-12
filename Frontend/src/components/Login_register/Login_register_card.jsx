import React, { useState } from "react";
import "../../CSS/Login_register_card.css";

import { useDispatch } from "react-redux";
import { FaPlaneDeparture, FaGoogle } from "react-icons/fa";

import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { auth } from "../../firebase/firebase";

import { setOpenLogin } from "../../Redux/Slice/CommonStatesSlice";

function Login_register_card() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);

      const provider = new GoogleAuthProvider();

      // Optional: force Google account selection
      provider.setCustomParameters({
        prompt: "select_account",
      });

      // Redirect to Google
      await signInWithRedirect(auth, provider);
    } catch (err) {
      console.error("Google Login Error:", err);

      setLoading(false);
    }
  };

  return (
    <div className="register-card">
      <div className="register-logo">
        <div className="register-circle">
          <FaPlaneDeparture />
        </div>

        <h2>Planora</h2>
      </div>

      <div className="register-heading">
        <h1>Welcome to Planora</h1>
        <p>Sign in with your Google account.</p>
      </div>

      <button
        type="button"
        className="social-btn"
        onClick={handleGoogleLogin}
        disabled={loading}
      >
        <FaGoogle />

        {loading ? "Redirecting to Google..." : "Continue with Google"}
      </button>
    </div>
  );
}

export default Login_register_card;
