import React, { useState } from "react";
import "../../CSS/Login_register_card.css";

import { useDispatch } from "react-redux";
import { FaPlaneDeparture, FaGoogle } from "react-icons/fa";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase/firebase";

import { googleLogin } from "../../services/authAPI";

import toast from "react-hot-toast";

import { loginSuccess, setError } from "../../Redux/Slice/userSlice";
import { setOpenLogin,setTheme } from "../../Redux/Slice/CommonStatesSlice";

import { useNavigate } from "react-router-dom";

function Login_register_card() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);

      // 1. Create Google provider
      const provider = new GoogleAuthProvider();

      // 2. Open Google login popup
      const result = await signInWithPopup(auth, provider);

      console.log("Google user:", result.user);

      // 3. Get Firebase ID token
      const idToken = await result.user.getIdToken();

      console.log("Firebase ID token received");

      // 4. Send token to your backend
      const data = await googleLogin(idToken);

      console.log("Backend response:", data);

      // 5. Store login data in Redux
      dispatch(loginSuccess(data));
     dispatch(setTheme(data.user.theme));
      toast.success("Login Successful");

      // 6. Close login modal
      dispatch(setOpenLogin(false));

      // 7. Navigate to home
      navigate("/");
    } catch (err) {
      console.error("Google Login Error:", err);

      const message =
        err.response?.data?.message || err.message || "Google Login Failed";

      dispatch(setError(message));

      toast.error(message);
    } finally {
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
        <i class="fa-brands fa-google"></i>

        {loading ? "Signing in..." : "Continue with Google"}
      </button>
    </div>
  );
}

export default Login_register_card;
