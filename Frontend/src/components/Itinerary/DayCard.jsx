import { FiChevronDown, FiCalendar } from "react-icons/fi";
import Timeline from "./Timeline";

import "../../CSS/itinerary/dayCard.css";

function DayCard({ day, isOpen, onToggle, onShowRestaurants }) {
  return (
    <div className="dayCard">
      {/* Day Header */}

      <div className="dayHeader" onClick={onToggle}>
        <div>
          <span className="dayNumber">Day {day.day}</span>

          <h3>{day.title}</h3>

          <p>
            <FiCalendar />
            Day {day.day}
          </p>
        </div>

        <FiChevronDown className={isOpen ? "rotate" : ""} />
      </div>

      {/* Day Body */}

      {isOpen && (
        <div className="dayBody">
          <div className="dayDivider"></div>

          <div className="timelineWrapper">
            {day.activities?.map((activity, index) => (
              <Timeline
                key={`${day.day}-${index}`}
                activity={activity}
                onShowRestaurants={onShowRestaurants}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default DayCard;
