import { FiArrowRight, FiCalendar, FiMapPin, FiUsers } from "react-icons/fi";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../../CSS/tripCard.css";

export default function TripCard({ trip }) {
  const navigate = useNavigate();

  const { theme } = useSelector((state) => state.commonStates);

  const totalTravelers =
    (trip.travelers?.adults || 0) +
    (trip.travelers?.children || 0) +
    (trip.travelers?.infants || 0);

  return (
    <div className={`tripCard ${theme ? "" : "light-tripCard"}`}>
      {/* Cover Image */}
      <div className="tripImage">
        <img
          src={trip.itinerary?.trip?.image}
          alt={trip.destination?.name || "Trip"}
        />
      </div>

      <div className="tripContent">
        {/* Destination */}
        <h3>{trip.destination?.name || "Unknown Destination"}</h3>

        {/* Dates */}
        <p>
          <FiCalendar />

          {trip.travelDates?.startDate
            ? new Date(trip.travelDates.startDate).toLocaleDateString("en-IN")
            : "N/A"}

          {" - "}

          {trip.travelDates?.endDate
            ? new Date(trip.travelDates.endDate).toLocaleDateString("en-IN")
            : "N/A"}
        </p>

        {/* Travelers */}
        <p>
          <FiUsers />
          {totalTravelers} Travelers
        </p>

        {/* Destination */}
        <p>
          <FiMapPin />
          {trip.destination?.name || "Unknown"}
        </p>

        <div className="tripBottom">
          <div className="tripbottom-details">
            {/* Days */}
            <span>
              {trip.travelDates?.duration || trip.itinerary?.days || 0} Days
            </span>

            {/* Budget */}
            <span>₹{trip.budget?.amount || 0}</span>
          </div>

          <button onClick={() => navigate(`/itinerary/${trip._id}`)}>
            View Itinerary
            <FiArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}
