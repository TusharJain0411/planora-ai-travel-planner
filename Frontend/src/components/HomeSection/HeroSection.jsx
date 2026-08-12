import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import "../../CSS/homeSection/heroSection.css";
import { resetTrip } from "../../Redux/Slice/tripSlice";
import {useDispatch} from "react-redux"

export default function HeroSection() {
  const navigate = useNavigate();

  const [videoLoaded, setVideoLoaded] = useState(false);

  const handleVideoReady = () => {
    setVideoLoaded(true);
  };
  const dispatch =useDispatch();
  return (
    <section className="Home_heroSection">
      {/* Video Loading Screen */}
      {!videoLoaded && (
        <div className="heroVideoLoader">
          <div className="heroSpinner"></div>
          <p>Loading your journey...</p>
        </div>
      )}

      {/* Background Video */}
      <video
        className={`heroVideo ${videoLoaded ? "videoReady" : ""}`}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onCanPlay={handleVideoReady}
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
            onClick={() => {
                dispatch(resetTrip());
              navigate("/traveldetailpage")}}
          >
            Generate New Trip
            <FiArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
}
