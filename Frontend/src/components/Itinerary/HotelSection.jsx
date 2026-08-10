import { useRef, useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import "../../CSS/itinerary/hotelSection.css";
import HotelCard from "./HotelCard";
import { useSelector } from "react-redux";

export default function HotelSection({ stays = [], accommodation = "Hotel" }) {
  const { theme } = useSelector((state) => state.commonStates);

  const scrollRef = useRef(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    const container = scrollRef.current;

    if (!container) return;

    setCanScrollLeft(container.scrollLeft > 5);

    setCanScrollRight(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 5,
    );
  };

  const scrollLeft = () => {
    const container = scrollRef.current;

    if (!container) return;

    container.scrollBy({
      left: -400,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    const container = scrollRef.current;

    if (!container) return;

    container.scrollBy({
      left: 400,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    checkScroll();

    const container = scrollRef.current;

    if (!container) return;

    container.addEventListener("scroll", checkScroll);

    window.addEventListener("resize", checkScroll);

    return () => {
      container.removeEventListener("scroll", checkScroll);

      window.removeEventListener("resize", checkScroll);
    };
  }, [stays]);

  // Don't show section if backend didn't find any stays
  if (!stays.length) {
    return null;
  }

  return (
    <section className="hotelSection">
      <div className={`hotelHeading ${theme ? "" : "light-hotelHeading"}`}>
        <h2>Recommended {accommodation}s</h2>

        <p>
          The best stays based on your budget, destination and travel style.
        </p>
      </div>

      <div className="hotelWrapper">
        {canScrollLeft && (
          <button className="scrollBtn leftBtn" onClick={scrollLeft}>
            <FiChevronLeft />
          </button>
        )}

        <div className="hotelGrid" ref={scrollRef}>
          {stays.map((stay) => (
            <HotelCard key={stay.placeId} hotel={stay} />
          ))}
        </div>

        {canScrollRight && (
          <button className="scrollBtn rightBtn" onClick={scrollRight}>
            <FiChevronRight />
          </button>
        )}
      </div>
    </section>
  );
}
