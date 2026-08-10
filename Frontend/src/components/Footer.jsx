import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";

import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

import "../CSS/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footerContainer">
        {/* Left */}
        <div className="footerAbout">
          <div className="footerLogo">
            ✈️ <span>Planora</span>
          </div>

          <p>
            Plan your perfect trip with AI-generated itineraries, budget
            planning, destination guides, hotels, restaurants and weather
            insights—all in one place.
          </p>

          <div className="footerSocial">
            <a href="#">
              <FaFacebookF />
            </a>

            <a href="#">
              <FaInstagram />
            </a>

            <a href="#">
              <FaLinkedinIn />
            </a>

            <a href="#">
              <FaGithub />
            </a>
          </div>
        </div>

        {/* Quick Links */}

        <div className="footerLinks">
          <h3>Quick Links</h3>

          <a href="/">Home</a>
          <a href="/explore">Explore</a>
          <a href="/trips">Trips</a>
          <a href="/planner">AI Planner</a>
        </div>

        {/* Company */}

        <div className="footerLinks">
          <h3>Company</h3>

          <a href="#">About Us</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms & Conditions</a>
          <a href="#">Contact</a>
        </div>

        {/* Contact */}

        <div className="footerContact">
          <h3>Contact</h3>

          <p>
            <FiMail />
            support@planora.com
          </p>

          <p>
            <FiPhone />
            +91 98765 43210
          </p>

          <p>
            <FiMapPin />
            Jaipur, Rajasthan, India
          </p>
        </div>
      </div>

      <div className="footerBottom">
        © {new Date().getFullYear()} Planora. All Rights Reserved.
      </div>
    </footer>
  );
}
