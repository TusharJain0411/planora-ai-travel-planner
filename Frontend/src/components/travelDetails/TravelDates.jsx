import "../../CSS/travelDetailsCSS/travelDates.css";
import { FaCalendarAlt } from "react-icons/fa";
import Calendar from "./Calendar";
import { useSelector } from "react-redux";

function TravelDates() {
  const { theme } = useSelector((state) => state.commonStates);

  const { startDate, endDate, duration } = useSelector(
    (state) => state.trip.travelDates,
  );

  const formatDate = (date) => {
    if (!date) return "--";

    return new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getDayName = (date) => {
    if (!date) return "Select a date";

    return new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
    });
  };

  return (
    <section
      className={`travel-dates ${
        theme ? "dark-travel-date" : "light-travel-date"
      }`}
    >
      <div className="travel-header2">
        <div className="travel-icon">
          <FaCalendarAlt />
        </div>

        <h2>Travel Dates</h2>
      </div>

      <div className="travel-content">
        <div className="calendar-container">
          <Calendar />
        </div>

        <div className="travel-info">
          <div className="info-card">
            <span>Departure Date</span>
            <h3>{formatDate(startDate)}</h3>
            <small>{getDayName(startDate)}</small>
          </div>

          <div className="info-card">
            <span>Return Date</span>
            <h3>{formatDate(endDate)}</h3>
            <small>{getDayName(endDate)}</small>
          </div>

          <div className="info-card">
            <span>Trip Duration</span>
            <h3>{duration} Days</h3>
            <small>{duration > 0 ? `${duration} Nights` : "--"}</small>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TravelDates;
