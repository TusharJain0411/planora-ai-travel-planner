import { Link } from "react-router-dom";
import "../CSS/navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { setTheme, setOpenLogin } from "../Redux/Slice/CommonStatesSlice";
import { FaSun, FaMoon, FaPlaneDeparture } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { useState, useRef, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import Login_register from "./Login_register/Login_register";
import { logout } from "../Redux/Slice/userSlice";
import { useNavigate } from "react-router-dom";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import { updateUserTheme } from "../services/authAPI";

function Navbar() {

   const [isOpen, setIsOpen] = useState(false);
   const menuRef = useRef(null);
   const buttonRef = useRef(null);
   const {theme,openLogin} = useSelector((item) => item.commonStates);
   const dispatch=useDispatch();
   const { currentUser, isLoggedIn } = useSelector((state) => state.user);
   const navigate=useNavigate();
   const [profileOpen,setProfileOpen]=useState(false);
   const [profileMenuOpen,setProfileMenuOpen]=useState(false);

const toggleTheme = async () => {
  const newTheme = !theme;

  // Update Redux immediately
  dispatch(setTheme(newTheme));

  // Only save to DB if logged in
  if (isLoggedIn) {
    try {
      const token = localStorage.getItem("token");

      await updateUserTheme(newTheme, token);
    } catch (error) {
      console.error("Failed to save theme:", error);
    }
  }
};

const handleOpenLogin=()=>{
dispatch(setOpenLogin(true));
}

const handleMenulist = () => {
    setIsOpen(!isOpen);
};

const handleProfile=()=>{
  setProfileOpen(!profileOpen);
}

const handleProfileMenu=()=>{
  setProfileMenuOpen(!profileMenuOpen);
}
const handleLogout = async () => {
  try {
    // If user logged in with Firebase (Google/GitHub)
    if (auth.currentUser) {
      await signOut(auth);
    }
      dispatch(setOpenLogin(false));
    dispatch(logout());
window.location.reload();
    navigate("/");
  } catch (err) {
    console.log(err);
  }
};

const handleProtectedNavigation = (path) => {
  if (!isLoggedIn) {
    dispatch(setOpenLogin(true));
    return;
  }

  navigate(path);
};

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
}
};

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);


  return (
    <>
      {openLogin && (
        <div className="popup-overlay" onClick={() =>dispatch( setOpenLogin(false))}>
          <div className="popup-login" onClick={(e) => e.stopPropagation()}>
            <Login_register closeModal={() => dispatch(setOpenLogin(false))} />
          </div>
        </div>
      )}

      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="logo">
            <div className="logo-icon">
              <FaPlaneDeparture />
            </div>

            <span className={`${theme ? "dark-logo" : "light-logo"}`}>
              Planora
            </span>
          </Link>

          <ul className={`navbar-links ${theme ? "dark-link" : "light-link"} `}>
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
                    dispatch(setOpenLogin(true));
                  }
                }}
              >
                AI Planner
              </Link>
            </li>
           
          </ul>

          <div className="nav-buttons">
            {!isLoggedIn ? (
              <button className={`login-btn `} onClick={handleOpenLogin}>
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

          {(profileOpen || profileMenuOpen) && (
            <div className="Profile-card" ref={menuRef}>
              {isLoggedIn && (
                <span>{currentUser?.name?.charAt(0).toUpperCase()}</span>
              )}
              {isLoggedIn && (
                <span className={`${theme ? "dark-name" : ""}`}>
                  {currentUser.name}
                </span>
              )}
              {isLoggedIn && <span>{currentUser.email}</span>}

              <ul
                className={`menu-list ${theme ? "dark-list" : "light-list"} `}
              >
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
                        dispatch(setOpenLogin(true));
                      }
                    }}
                  >
                    AI Planner
                  </Link>
                </li>
               
              </ul>
              <div className="profile-btn-section">
                <button
                  className={`theme-btn ${theme ? "sun" : "moon"}`}
                  onClick={toggleTheme}
                >
                  {theme ? <FaSun /> : <FaMoon />}
                </button>

                {isLoggedIn ? (
                  <button className="logout-btn" onClick={handleLogout}>
                    Logout
                  </button>
                ) : (
                  <button
                    className={`login-menu-btn `}
                    onClick={handleOpenLogin}
                  >
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
