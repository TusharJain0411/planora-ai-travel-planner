import { FiArrowRight, FiMapPin } from "react-icons/fi";
import { FaStar } from "react-icons/fa";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "../../CSS/explore/destinationCard.css";

export default function DestinationCard({ destination }) {
  const { theme } = useSelector((state) => state.commonStates);

  const navigate = useNavigate();

  return (
    <div className={`destinationCard ${theme ? "" : "light-destinationCard"}`}>
      <div className="destinationImage">
        <img src={destination.image} alt={destination.name} />

        <div className="ratingBadge">
          <FaStar />
          <span>{destination.rating}</span>
        </div>
      </div>

      <div className="destinationContent">
        <h3>{destination.name}</h3>

        <p className="country">
          <FiMapPin />
          {destination.country}
        </p>

        <div className="destinationTags">
          {destination.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>

        <div className="destinationInfo">
          <div>
            <small>Starting From</small>
            <h4>{destination.price}</h4>
          </div>

          <div>
            <small>Best Time</small>
            <h4>{destination.bestTime}</h4>
          </div>
        </div>

        <button
          className="exploreBtn"
          onClick={() => navigate(`/explore/${destination.id}`)}
        >
          Explore Trip
          <FiArrowRight />
        </button>
      </div>
    </div>
  );
}
