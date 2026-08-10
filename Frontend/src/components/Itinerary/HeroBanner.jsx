import "../../CSS/itinerary/heroBanner.css";
import { useNavigate } from "react-router-dom";
import {
  FiMapPin,
  FiEdit2,
  FiBookmark,
  FiCalendar,
  FiUsers,
  FiCloud,
  FiZap,
} from "react-icons/fi";

export default function HeroBanner({ trip, tripId }) {
  const navigate = useNavigate();
  if (!trip) return null;

  return (
    <section className="heroBanner">
      <img src={trip.image} alt={trip.destination} />

      <div className="heroOverlay"></div>

      <div className="heroContent">
        <div className="heroTop">
          <div>
            <h1>{trip?.destination}</h1>
            <p>
              <FiMapPin />
              {trip.cities.join(" | ")}
            </p>
          </div>
{/* 
          <div className="heroButtons">
            <button
              className="editBtn"
              onClick={() => navigate(`/edit-trip/${tripId}`)}
            >
              <FiEdit2 />
              <span>Edit Trip</span>
            </button>

            <button className="saveBtn">
              <FiBookmark />
              <span>Save Trip</span>
            </button> 
          </div> */}

        </div>

        <div className="heroBadges">
          <div className="badge">
            <FiCalendar />
            {trip.days} Days
          </div>

          <div className="badge">
            ₹{trip.estimatedBudget.toLocaleString("en-IN")} Estimated
          </div>

          <div className="badge">
            <FiUsers />
            {trip.travelers.adults} Adults
            {trip.travelers.children > 0 &&
              `, ${trip.travelers.children} Children`}
          </div>

          <div className="badge">
            <FiCloud />
            {trip.season}
          </div>
        </div>
      </div>
    </section>
  );
}
