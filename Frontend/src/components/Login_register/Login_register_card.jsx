import React,{useEffect, useState} from 'react'
import "../../CSS/Login_register_card.css"
import { useDispatch } from "react-redux";
import {
  FaPlaneDeparture,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGithub,
  FaGoogle,
  FaUser
} from "react-icons/fa";
import { registerUser, loginUser} from "../../services/authAPI";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { auth } from "../../firebase/firebase";

import { googleLogin } from "../../services/authAPI";

import toast from "react-hot-toast";

import {
  loginSuccess,
  signupSuccess,
  setError
} from "../../Redux/Slice/userSlice";

import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";
import { setOpenLogin } from '../../Redux/Slice/CommonStatesSlice';

function Login_register_card() {

   const dispatch = useDispatch();
   const { user } = useAuth();
   const navigate=useNavigate();
   const [showPassword, setShowPassword] = useState(false);
   const [showConfirmPassword,setShowConfirmPassword]=useState(false);
   const [shift,setShift]=useState(false);
    const [loginData, setLoginData] = useState({
      email: "",
      password: "",
    });

    const [registerData, setRegisterData] = useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });


   const switchRegister=()=>{
    setShift(true);
   }
   const switchLogin=()=>{
    setShift(false);
   }
   const handleLoginChange=(e)=>{
    setLoginData({
...loginData,
[e.target.name]:e.target.value
});
   };

  const handleRegisterChange = (e) => {
      setRegisterData({
        ...registerData,
        [e.target.name]: e.target.value,
      });
    };

    const handleRegister = async (e) => {
      e.preventDefault();
     if (
       !registerData.name ||
       !registerData.email ||
       !registerData.password ||
       !registerData.confirmPassword
     ) {
       toast.error("Please fill all fields");
       return;
     }
      if (registerData.password !== registerData.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      try {
        const data = await registerUser({
          name: registerData.name,
          email: registerData.email,
          password: registerData.password,
        });

        dispatch(signupSuccess("Registration Successful"));
   

        toast.success("Registration Successful");
        setShift(false);
      

      } catch (err) {
        const message = err.response?.data?.message || "Registration Failed";

        dispatch(setError(message));

        toast.error(message);
      }
     
    };

   const handleLogin = async (e) => {
     e.preventDefault();
if (!loginData.email || !loginData.password) {
  toast.error("Please fill all fields");
  return;
}


     try {
       const data = await loginUser(loginData);

       dispatch(loginSuccess(data));

       toast.success("Login Successful");
       
       dispatch(setOpenLogin(false));
       navigate("/");
      
     } catch (err) {
       const message = err.response?.data?.message || "Login Failed";

       dispatch(setError(message));

       toast.error(message);
     }
     
   };
 const handleGoogleLogin = async () => {
   try {
     const provider = new GoogleAuthProvider();

     const result = await signInWithPopup(auth, provider);

     const idToken = await result.user.getIdToken();

     const data = await googleLogin(idToken);

     dispatch(loginSuccess(data));

     toast.success("Login Successful");
     dispatch(setOpenLogin(false));
     navigate("/");
    
   } catch (err) {
     const message = err.response?.data?.message || "Google Login Failed";

     dispatch(setError(message));

     toast.error(message);
   }
  
 };

 

  return (
    <>
      {shift ? (
        <div className="register-card">
          <div className="register-logo">
            <div className="register-circle">
              <FaPlaneDeparture />
            </div>

            <h2>Planora</h2>
          </div>

          <div className="register-heading">
            <h1>Create Account</h1>
            <p>Start your AI-powered travel experience.</p>
          </div>

          <form className="register-form" onSubmit={handleRegister}>
            <div className="form-group">
              <div className="input-box">
                <FaUser />

                <input
                  type="text"
                  placeholder="Enter your Full Name"
                  name="name"
                  onChange={handleRegisterChange}
                />
              </div>
            </div>

            <div className="form-group">
              <div className="input-box">
                <FaEnvelope />

                <input
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  onChange={handleRegisterChange}
                />
              </div>
            </div>

            <div className="form-group">
              <div className="input-box">
                <FaLock />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  name="password"
                  onChange={handleRegisterChange}
                />

                <button
                  type="button"
                  className="eye-btn register-eye"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <div className="input-box">
                <FaLock />

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm the password"
                  name="confirmPassword"
                  onChange={handleRegisterChange}
                />

                <button
                  type="button"
                  className="eye-btn register-confirm-eye"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button className="register-btn" type="submit">
              Register
            </button>

            <div className="divider">
              <span>OR</span>
            </div>

            <button
              type="button"
              className="social-btn"
              onClick={handleGoogleLogin}
            >
              <FaGoogle />
              Continue with Google
            </button>

            <div className="login-link">
              Already have an account?
              <a onClick={switchLogin}> Sign In</a>
            </div>
          </form>
        </div>
      ) : (
        <div className="login-card">
          <div className="login-logo">
            <div className="logo-circle">
              <FaPlaneDeparture />
            </div>

            <h2>Planora</h2>
          </div>

          <div className="login-heading">
            <h1>Welcome Back</h1>
            <p>Sign in to continue your journey.</p>
          </div>

          <form className="login-form" onSubmit={handleLogin}>
            <div className="form-group">
              <div className="input-box">
                <FaEnvelope />

                <input
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  onChange={handleLoginChange}
                />
              </div>
            </div>

            <div className="form-group">
              <div className="input-box">
                <FaLock />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  name="password"
                  onChange={handleLoginChange}
                />

                <button
                  type="button"
                  className="login-eye-btn "
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button className="signin-btn" type="submit">
              Sign In
            </button>

            <div className="divider">
              <span>OR</span>
            </div>

            <button
              type="button"
              className="social-btn"
              onClick={handleGoogleLogin}
            >
              <FaGoogle />
              Continue with Google
            </button>

            <div className="register-link">
              Don't have an account?
              <a onClick={switchRegister}> Create Account</a>
            </div>
          </form>
        </div>
      )} 

       
      
    </>
  );
}

export default Login_register_card
