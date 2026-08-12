import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getRedirectResult } from "firebase/auth";
import { auth } from "../firebase/firebase";

import { googleLogin } from "../services/authAPI";

import { loginSuccess, setError } from "../Redux/Slice/userSlice";

import { setOpenLogin, setTheme } from "../Redux/Slice/CommonStatesSlice";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AuthRedirectHandler() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        console.log("Checking Google redirect result...");

        const result = await getRedirectResult(auth);

        // No Google login happened
        if (!result) {
          console.log("No redirect login result");
          return;
        }

        console.log("Google user:", result.user);

        const idToken = await result.user.getIdToken();

        console.log("Firebase ID token received");

        const data = await googleLogin(idToken);

        console.log("Backend response:", data);

        dispatch(loginSuccess(data));

        dispatch(setTheme(data.user.theme));

        dispatch(setOpenLogin(false));

        toast.success("Login Successful");

        navigate("/");
      } catch (err) {
        console.error("Google Redirect Login Error:", err);

        const message =
          err.response?.data?.message || err.message || "Google Login Failed";

        dispatch(setError(message));

        toast.error(message);
      }
    };

    handleRedirectResult();
  }, [dispatch, navigate]);

  return null;
}
