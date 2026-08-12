import React, { useState } from "react";

import "../../CSS/Login_register_card.css";

import { useDispatch } from "react-redux";

import { FaPlaneDeparture } from "react-icons/fa";

import { loginUser, registerUser } from "../../services/authAPI";

import { loginSuccess, setError } from "../../Redux/Slice/userSlice";

import { setOpenLogin, setTheme } from "../../Redux/Slice/CommonStatesSlice";

import toast from "react-hot-toast";

function Login_register_card() {
  const dispatch = useDispatch();

  const [isRegister, setIsRegister] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      let data;

      // =========================
      // REGISTER
      // =========================
      if (isRegister) {
        data = await registerUser({
          name,
          email,
          password,
        });

        toast.success("Account created successfully!");

        // Switch to login after successful registration
        setIsRegister(false);

        setName("");
        setPassword("");

        return;
      }

      // =========================
      // LOGIN
      // =========================
      data = await loginUser({
        email,
        password,
      });

      console.log("Login response:", data);

      // Store user + token in Redux/localStorage
      dispatch(loginSuccess(data));

      // Sync user's saved theme
      if (data.user?.theme !== undefined) {
        dispatch(setTheme(data.user.theme));
      }

      toast.success("Login successful!");

      // Close login popup
      dispatch(setOpenLogin(false));

      // Clear form
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Authentication Error:", error);

      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Something went wrong";

      dispatch(setError(message));

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleSwitch = () => {
    setIsRegister((prev) => !prev);

    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="register-card">
      {/* LOGO */}
      <div className="register-logo">
        <div className="register-circle">
          <FaPlaneDeparture />
        </div>

        <h2>Planora</h2>
      </div>

      {/* HEADING */}
      <div className="register-heading">
        <h1>{isRegister ? "Create Your Account" : "Welcome to Planora"}</h1>

        <p>
          {isRegister
            ? "Create an account to start planning your trips."
            : "Login to continue planning your trips."}
        </p>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit}>
        {/* NAME - REGISTER ONLY */}
        {isRegister && (
          <div className="input-group">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        )}

        {/* EMAIL */}
        <div className="input-group">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* PASSWORD */}
        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </div>

        {/* SUBMIT */}
        <button type="submit" className="social-btn" disabled={loading}>
          {loading
            ? isRegister
              ? "Creating Account..."
              : "Logging in..."
            : isRegister
              ? "Create Account"
              : "Login"}
        </button>
      </form>

      {/* SWITCH LOGIN / REGISTER */}
      <div className="auth-switch">
        <p>
          {isRegister ? "Already have an account?" : "Don't have an account?"}

          <button type="button" onClick={handleSwitch}>
            {isRegister ? " Login" : " Register"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login_register_card;
