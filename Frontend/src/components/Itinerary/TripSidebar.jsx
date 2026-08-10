
import "../../CSS/itinerary/sidebar.css";

import {
  FiMapPin,
  FiCalendar,
  FiUsers,
  FiDollarSign,
  FiCloud,
  FiGlobe,
  FiClock,
  FiHeart,
  FiStar,
  FiDownload,
  FiShare2,
  FiBookmark,
} from "react-icons/fi";

import { useSelector } from "react-redux";

export default function TripSidebar({ trip }) {
  const { theme } = useSelector((state) => state.commonStates);

  if (!trip) return null;

  // Destination
  const destination =
    typeof trip.destination === "object"
      ? trip.destination?.name
      : trip.destination || "Not specified";

  // Travel dates
  const startDate = trip.travelDates?.startDate;
  const endDate = trip.travelDates?.endDate;

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const travelDates =
    startDate && endDate
      ? `${formatDate(startDate)} - ${formatDate(endDate)}`
      : "Not specified";

  // Duration
  const duration = trip.travelDates?.duration || 0;

  const durationText =
    duration > 0
      ? `${duration} Days / ${Math.max(duration - 1, 0)} Nights`
      : "Not specified";

  // Budget
  const budget = trip.budget?.amount || 0;

  const budgetText =
    budget > 0
      ? `₹${budget.toLocaleString("en-IN")}`
      : "Not specified";

  // Travelers
  const adults = trip.travelers?.adults || 0;
  const children = trip.travelers?.children || 0;
  const infants = trip.travelers?.infants || 0;

  let travelerText = `${adults} Adults`;

  if (children > 0) {
    travelerText += `, ${children} Children`;
  }

  if (infants > 0) {
    travelerText += `, ${infants} Infants`;
  }

  // Travel style
  const travelStyle =
    trip.travelStyle?.style || "Not specified";

  // Interests
  const interests =
    Array.isArray(trip.travelStyle?.interests) &&
    trip.travelStyle.interests.length > 0
      ? trip.travelStyle.interests.join(", ")
      : "Not specified";

  // Preferences
  const food =
    trip.preferences?.food || "Not specified";

  const accommodation =
    trip.preferences?.accommodation || "Not specified";

  const transport =
    trip.preferences?.transport || "Not specified";

  // AI estimated cost
  const estimatedCost =
    trip.estimatedBudget ||
    trip.aiEstimatedCost ||
    budget;

  const estimatedCostText =
    estimatedCost > 0
      ? `₹${estimatedCost.toLocaleString("en-IN")}`
      : "Not available";

  const details = [
    {
      icon: <FiMapPin />,
      title: "Destination",
      value: destination,
    },
    {
      icon: <FiCalendar />,
      title: "Travel Dates",
      value: travelDates,
    },
    {
      icon: <FiClock />,
      title: "Duration",
      value: durationText,
    },
    {
      icon: <FiDollarSign />,
      title: "Budget",
      value: budgetText,
    },
    {
      icon: <FiUsers />,
      title: "Travelers",
      value: travelerText,
    },
    {
      icon: <FiHeart />,
      title: "Travel Style",
      value: travelStyle,
    },
    {
      icon: <FiStar />,
      title: "Interests",
      value: interests,
    },
    {
      icon: <FiGlobe />,
      title: "Food",
      value: food,
    },
    {
      icon: <FiCloud />,
      title: "Accommodation",
      value: accommodation,
    },
  ];

  return (
    <aside className={`sidebar ${theme ? "" : "light-sidebar"}`}>
      <h2>Trip Summary</h2>

      <div
        className={`sidebarCard ${
          theme ? "" : "lightSidebarCard"
        }`}
      >
        {details.map((item, index) => (
          <div className="tripInfo" key={index}>
            <div className="tripInfoIcon">
              {item.icon}
            </div>

            <div
              className={`tripInfoText ${
                theme ? "" : "light-tripInfoText"
              }`}
            >
              <span>{item.title}</span>
              <h5>{item.value}</h5>
            </div>
          </div>
        ))}
      </div>

      <div className="sidebar-lower">

      {/* AI Estimated Cost */}
      <div
        className={`estimatedCost ${
          theme ? "" : "light-estimatedCost"
        }`}
      >
        <p>AI Estimated Cost</p>

        <h2>{estimatedCostText}</h2>

        {budget > 0 && estimatedCost <= budget && (
          <span>✓ Within your budget</span>
        )}

        {budget > 0 && estimatedCost > budget && (
          <span>⚠ Above your budget</span>
        )}

        {!estimatedCost && (
          <span>AI estimate unavailable</span>
        )}
      </div>

      <div
        className={`sidebarButtons ${
          theme ? "" : "light-sidebarButtons"
        }`}
      >
        <button className="primaryBtn">
          <FiDownload />
          Download PDF
        </button>

        <button className="secondaryBtn">
          <FiShare2 />
          Share Trip
        </button>

        <button className="secondaryBtn">
          <FiBookmark />
          Save Trip
        </button>
      </div>

      </div>

    </aside>
  );
}
