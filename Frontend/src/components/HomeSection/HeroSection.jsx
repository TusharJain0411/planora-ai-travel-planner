import { useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import "../../CSS/homeSection/heroSection.css";

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="Home_heroSection">
      {/* Background Video */}
      <video
        className="heroVideo"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/videos/travel-hero.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="heroOverlay"></div>

      {/* Content */}
      <div className="heroContent">
        <h1>
          Plan Your Dream
          <span> Journey</span>
          <br />
          In Minutes
        </h1>

        <p>
          Create personalized travel itineraries with AI. Discover the best
          hotels, restaurants, attractions, routes and weather — all in one
          place.
        </p>

        <div className="heroButtons">
          <button
            className="generateBtn"
            onClick={() => navigate("/traveldetailpage")}
          >
            Generate New Trip
            <FiArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
}
