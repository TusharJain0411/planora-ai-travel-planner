import { useRef, useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import "../../CSS/itinerary/weatherSection.css";
import WeatherCard from "./WeatherCard";
import { useSelector } from "react-redux";

export default function WeatherSection({ weather, destination }) {
  const { theme } = useSelector((state) => state.commonStates);

  const scrollRef = useRef(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);

  const [canScrollRight, setCanScrollRight] = useState(false);

  // Check whether left/right scrolling is possible
  const checkScroll = () => {
    const container = scrollRef.current;

    if (!container) return;

    setCanScrollLeft(container.scrollLeft > 5);

    setCanScrollRight(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 5,
    );
  };

  // Scroll one card left
  const scrollLeft = () => {
    const container = scrollRef.current;

    if (!container) return;

    const card = container.querySelector(".weatherCard");

    if (!card) return;

    container.scrollBy({
      left: -(card.offsetWidth + 20),
      behavior: "smooth",
    });
  };

  // Scroll one card right
  const scrollRight = () => {
    const container = scrollRef.current;

    if (!container) return;

    const card = container.querySelector(".weatherCard");

    if (!card) return;

    container.scrollBy({
      left: card.offsetWidth + 20,
      behavior: "smooth",
    });
  };

  // Recheck buttons whenever weather data changes
  useEffect(() => {
    const container = scrollRef.current;

    if (!container) return;

    // Initial check
    checkScroll();

    container.addEventListener("scroll", checkScroll);

    window.addEventListener("resize", checkScroll);

    return () => {
      container.removeEventListener("scroll", checkScroll);

      window.removeEventListener("resize", checkScroll);
    };
  }, [weather]);

  // No weather data
  if (!weather || weather.length === 0) {
    return null;
  }

  return (
    <section
      className={`weatherSection ${theme ? "" : "light-weatherSection"}`}
    >
      {/* Heading */}

      <div className={`weatherHeading ${theme ? "" : "light-weatherHeading"}`}>
        <h2>Weather Forecast</h2>

        <p>
          Expected weather during your trip
          {destination ? ` to ${destination}` : ""}
        </p>
      </div>

      {/* Weather Slider */}

      <div className="weatherWrapper">
        {/* Left Button */}

        {canScrollLeft && (
          <button
            className="weatherScrollBtn leftWeatherBtn"
            onClick={scrollLeft}
          >
            <FiChevronLeft />
          </button>
        )}

        {/* Cards */}

        <div className="weatherGrid" ref={scrollRef}>
          {weather.map((item) => (
            <WeatherCard key={item.date} weather={item} />
          ))}
        </div>

        {/* Right Button */}

        {canScrollRight && (
          <button
            className="weatherScrollBtn rightWeatherBtn"
            onClick={scrollRight}
          >
            <FiChevronRight />
          </button>
        )}
      </div>
    </section>
  );
}
