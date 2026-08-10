import { useEffect, useRef, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import "../../../CSS/itinerary/Restaurant/RestaurantSection.css";
import { useSelector } from "react-redux";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function RestaurantSection({ restaurants, showRestaurants }) {
  const { theme } = useSelector((state) => state.commonStates);

  const restaurantGridRef = useRef(null);

  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  if (!showRestaurants || !restaurants?.length) {
    return null;
  }

  const checkScrollPosition = () => {
    const container = restaurantGridRef.current;

    if (!container) return;

    const isAtStart = container.scrollLeft <= 0;

    const isAtEnd =
      container.scrollLeft + container.clientWidth >= container.scrollWidth - 1;

    setShowLeftButton(!isAtStart);
    setShowRightButton(!isAtEnd);
  };

  const scrollLeft = () => {
    const container = restaurantGridRef.current;

    if (!container) return;

    container.scrollBy({
      left: -320,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    const container = restaurantGridRef.current;

    if (!container) return;

    container.scrollBy({
      left: 320,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const container = restaurantGridRef.current;

    if (!container) return;

    checkScrollPosition();

    container.addEventListener("scroll", checkScrollPosition);

    window.addEventListener("resize", checkScrollPosition);

    return () => {
      container.removeEventListener("scroll", checkScrollPosition);
      window.removeEventListener("resize", checkScrollPosition);
    };
  }, [restaurants]);

  return (
    <section
      id="restaurant-section"
      className={`restaurantSection ${theme ? "" : "light-restaurantSection"}`}
    >
      <div className="restaurantHeader">

      <h2>🍽 Nearby Restaurants</h2>

      <p>Top recommended restaurants near your selected meal location.</p>

      </div>

      <div className="restaurantSlider">
        {showLeftButton && (
          <button
            className="restaurantScrollButton restaurantScrollButtonLeft"
            onClick={scrollLeft}
            aria-label="Previous restaurants"
          >
            <FiChevronLeft />
          </button>
        )}

        <div className="restaurantGrid" ref={restaurantGridRef}>
          {restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.placeId} restaurant={restaurant} />
          ))}
        </div>

        {showRightButton && (
          <button
            className="restaurantScrollButton restaurantScrollButtonRight"
            onClick={scrollRight}
            aria-label="Next restaurants"
          >
            <FiChevronRight />
          </button>
        )}
      </div>
    </section>
  );
}
