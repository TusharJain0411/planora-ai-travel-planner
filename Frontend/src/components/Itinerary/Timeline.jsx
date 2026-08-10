import { useState } from "react";

import {
  FiClock,
  FiDollarSign,
  FiTruck,
  FiMapPin,
  FiStar,
  FiNavigation,
  FiZap,
  FiChevronDown,
} from "react-icons/fi";

import "../../CSS/itinerary/timeline.css";

import { useSelector } from "react-redux";

export default function Timeline({ activity, onShowRestaurants }) {
  const { theme } = useSelector((state) => state.commonStates);

  const [expanded, setExpanded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const expandCard = () => {
    const nextExpanded = !expanded;

    setExpanded(nextExpanded);
    setIsOpen(nextExpanded);

    if (!nextExpanded) {
      onShowRestaurants([]);
    }
  };

  const isMeal = ["Breakfast", "Lunch", "Dinner"].includes(activity.type);

  const handleNearbyRestaurants = (e) => {
    e.stopPropagation();

    onShowRestaurants(activity.restaurants || []);
  };

 const handleViewOnMap = (e) => {
   e.preventDefault();
   e.stopPropagation();

   const lat = activity.location?.lat;
   const lng = activity.location?.lng;

   console.log("MAP CLICKED");
   console.log("LAT:", lat);
   console.log("LNG:", lng);

   if (lat == null || lng == null) {
     console.log("Coordinates missing");
     return;
   }

   const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

   console.log("OPENING:", googleMapsUrl);

   window.open(googleMapsUrl, "_blank");
 };

  return (
    <div className="timelineItem">
      {/* Timeline */}

      <div className={`timelineLeft ${theme ? "" : "light-timelineLeft"}`}>
        <div className="circle"></div>

        <div className="line"></div>
      </div>

      {/* Card */}

      <div
        className={`timelineContent ${theme ? "" : "light-timelineContent"}`}
      >
        <div className="content-top" onClick={expandCard}>
          {/* Activity Image */}

          {expanded && activity.image && (
            <img
              src={activity.image}
              alt={activity.place}
              className="activityImage"
            />
          )}

          <div className="timelineBody">
            <div className="d-flex justify-content-between">
              <span className="time">
                <FiClock />
                {activity.time}
              </span>

              <button type="button">
                <FiChevronDown className={isOpen ? "rotate" : ""} />
              </button>
            </div>

            {/* Place Name */}

            <h3>{activity.place}</h3>

            {/* Description */}

            <p>{activity.description}</p>

            {expanded && (
              <div className="timelineTags">
                {/* Cost */}

                {activity.cost && (
                  <span>
                    <FiDollarSign />
                    {activity.cost}
                  </span>
                )}

                {/* Transport */}

                {activity.transport && (
                  <span>
                    <FiTruck />
                    {activity.transport}
                  </span>
                )}

                {/* Duration */}

                {activity.duration && (
                  <span>
                    <FiMapPin />
                    {activity.duration}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Expanded Content */}

        {expanded && (
          <>
            {/* AI Recommendation */}

            {activity.tip && (
              <div
                className={`aiRecommendation ${
                  theme ? "" : "light-aiRecommendation"
                }`}
              >
                <h4>
                  <FiZap />
                  AI Recommendation
                </h4>

                <p>{activity.tip}</p>
              </div>
            )}

            {/* Restaurants */}

            {isMeal && activity.restaurants?.length > 0 && (
              <button
                className="restaurantBtn"
                onClick={handleNearbyRestaurants}
              >
                🍽 View Nearby Restaurants
              </button>
            )}

            {/* Footer */}

            <div className="timelineFooter">
              {/* Rating */}

              {activity.rating != null ? (
                <div className="rating">
                  <FiStar />

                  <span>{Number(activity.rating).toFixed(1)}</span>
                </div>
              )
            :""}

              {/* Google Maps */}

              <button
                type="button"
                className="activityBtn"
                onClick={handleViewOnMap}
              >
                <FiNavigation />
                View on Map
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
