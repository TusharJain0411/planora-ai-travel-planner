import { Link, useNavigate } from "react-router-dom";
import "../CSS/navbar.css";

import { useDispatch, useSelector } from "react-redux";

import { setTheme, setOpenLogin } from "../Redux/Slice/CommonStatesSlice";

import { FaSun, FaMoon, FaPlaneDeparture } from "react-icons/fa";

import { FiMenu } from "react-icons/fi";
import { useState, useRef, useEffect } from "react";

import Login_register from "./Login_register/Login_register";

import { logout } from "../Redux/Slice/userSlice";

import { GoChevronDown, GoChevronUp } from "react-icons/go";

import { updateUserTheme } from "../services/authAPI";

import { resetTrip } from "../Redux/Slice/tripSlice";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const { theme, openLogin } = useSelector((state) => state.commonStates);

  const { currentUser, isLoggedIn } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [profileOpen, setProfileOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  // ==========================================
  // THEME
  // ==========================================

  const toggleTheme = async () => {
    const newTheme = !theme;

    // Update Redux immediately
    dispatch(setTheme(newTheme));

    // Save theme to database if logged in
    if (isLoggedIn) {
      try {
        const token = localStorage.getItem("token");

        await updateUserTheme(newTheme, token);
      } catch (error) {
        console.error("Failed to save theme:", error);

        // Optional: revert theme if API fails
        dispatch(setTheme(theme));
      }
    }
  };

  // ==========================================
  // OPEN LOGIN
  // ==========================================

  const handleOpenLogin = () => {
    dispatch(setOpenLogin(true));
  };

  // ==========================================
  // PROFILE
  // ==========================================

  const handleProfile = () => {
    setProfileOpen((prev) => !prev);
    setProfileMenuOpen(false);
  };

  const handleProfileMenu = () => {
    setProfileMenuOpen((prev) => !prev);
    setProfileOpen(false);
  };

  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = () => {
    try {
      setLogoutLoading(true);

      // Close login/profile menus
      dispatch(setOpenLogin(false));

      setProfileOpen(false);
      setProfileMenuOpen(false);

      // Clear Redux user + localStorage
      dispatch(logout());

      // Go home
      navigate("/");
    } catch (err) {
      console.error("Logout Error:", err);
    } finally {
      setLogoutLoading(false);
    }
  };

  // ==========================================
  // PROTECTED NAVIGATION
  // ==========================================

  const handleProtectedNavigation = (path) => {
    if (!isLoggedIn) {
      dispatch(setOpenLogin(true));
      return;
    }

    navigate(path);
  };

  // ==========================================
  // CLICK OUTSIDE
  // ==========================================

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        setProfileOpen(false);
        setProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* ==========================================
          LOGIN MODAL
      ========================================== */}

      {openLogin && (
        <div
          className="popup-overlay"
          onClick={() => dispatch(setOpenLogin(false))}
        >
          <div className="popup-login" onClick={(e) => e.stopPropagation()}>
            <Login_register closeModal={() => dispatch(setOpenLogin(false))} />
          </div>
        </div>
      )}

      {/* ==========================================
          NAVBAR
      ========================================== */}

      <nav className="navbar">
        <div className="nav-container">
          {/* LOGO */}

          <Link to="/" className="logo">
            <div className="logo-icon">
              <FaPlaneDeparture />
            </div>

            <span className={theme ? "dark-logo" : "light-logo"}>Planora</span>
          </Link>

          {/* ==========================================
              DESKTOP LINKS
          ========================================== */}

          <ul className={`navbar-links ${theme ? "dark-link" : "light-link"}`}>
            <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <Link
                to="/explore"
                onClick={(e) => {
                  if (!isLoggedIn) {
                    e.preventDefault();
                    dispatch(setOpenLogin(true));
                  }
                }}
              >
                Explore
              </Link>
            </li>

            <li>
              <Link
                to="/trips"
                onClick={(e) => {
                  if (!isLoggedIn) {
                    e.preventDefault();
                    dispatch(setOpenLogin(true));
                  }
                }}
              >
                Trips
              </Link>
            </li>

            <li>
              <Link
                to="/traveldetailpage"
                onClick={(e) => {
                  if (!isLoggedIn) {
                    e.preventDefault();

                    dispatch(resetTrip());
                    dispatch(setOpenLogin(true));
                  }
                }}
              >
                AI Planner
              </Link>
            </li>
          </ul>

          {/* ==========================================
              NAV BUTTONS
          ========================================== */}

          <div className="nav-buttons">
            {!isLoggedIn ? (
              <button className="login-btn" onClick={handleOpenLogin}>
                Login
              </button>
            ) : (
              <button
                className="profile-btn"
                ref={buttonRef}
                onClick={handleProfile}
              >
                <span>{currentUser?.name?.charAt(0).toUpperCase()}</span>

                {profileOpen ? <GoChevronUp /> : <GoChevronDown />}
              </button>
            )}

            {/* MOBILE MENU */}

            <button
              className={`profile-menu-btn ${profileMenuOpen ? "tilt" : ""}`}
              ref={buttonRef}
              onClick={handleProfileMenu}
            >
              {isLoggedIn && (
                <span>{currentUser?.name?.charAt(0).toUpperCase()}</span>
              )}

              <FiMenu />
            </button>
          </div>

          {/* ==========================================
              PROFILE MENU
          ========================================== */}

          {(profileOpen || profileMenuOpen) && (
            <div className="Profile-card" ref={menuRef}>
              {/* USER INFO */}

              {isLoggedIn && (
                <>
                  <span>{currentUser?.name?.charAt(0).toUpperCase()}</span>

                  <span className={theme ? "dark-name" : ""}>
                    {currentUser?.name}
                  </span>

                  <span>{currentUser?.email}</span>
                </>
              )}

              {/* MENU */}

              <ul className={`menu-list ${theme ? "dark-list" : "light-list"}`}>
                <li>
                  <Link to="/">Home</Link>
                </li>

                <li>
                  <Link
                    to="/explore"
                    onClick={(e) => {
                      if (!isLoggedIn) {
                        e.preventDefault();
                        dispatch(setOpenLogin(true));
                      }
                    }}
                  >
                    Explore
                  </Link>
                </li>

                <li>
                  <Link
                    to="/trips"
                    onClick={(e) => {
                      if (!isLoggedIn) {
                        e.preventDefault();
                        dispatch(setOpenLogin(true));
                      }
                    }}
                  >
                    Trips
                  </Link>
                </li>

                <li>
                  <Link
                    to="/traveldetailpage"
                    onClick={(e) => {
                      if (!isLoggedIn) {
                        e.preventDefault();

                        dispatch(resetTrip());
                        dispatch(setOpenLogin(true));
                      }
                    }}
                  >
                    AI Planner
                  </Link>
                </li>
              </ul>

              {/* ==========================================
                  THEME + LOGOUT
              ========================================== */}

              <div className="profile-btn-section">
                <button
                  className={`theme-btn ${theme ? "sun" : "moon"}`}
                  onClick={toggleTheme}
                >
                  {theme ? <FaSun /> : <FaMoon />}
                </button>

                {isLoggedIn ? (
                  logoutLoading ? (
                    <button className="logout-btn" type="button" disabled>
                      Signing out...
                    </button>
                  ) : (
                    <button className="logout-btn" onClick={handleLogout}>
                      Logout
                    </button>
                  )
                ) : (
                  <button className="login-menu-btn" onClick={handleOpenLogin}>
                    Login
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
