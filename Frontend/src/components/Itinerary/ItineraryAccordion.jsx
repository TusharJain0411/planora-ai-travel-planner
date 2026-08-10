import DayCard from "./DayCard";
import "../../CSS/itinerary/itineraryAccordion.css";
import { useSelector } from "react-redux";

function ItineraryAccordion({
  selectedDay,
  setSelectedDay,
  onShowRestaurants,
}) {
  const { theme } = useSelector((state) => state.commonStates);

  const itinerary = useSelector((state) => state.trip.itinerary);

  const days = itinerary?.days || [];

  return (
    <section
      className={`itineraryAccordion ${
        theme ? "dark-itinerary" : "light-itinerary"
      }`}
    >
      <h2>Day-wise Itinerary</h2>

      {days.map((day) => (
        <DayCard
          key={day.day}
          day={day}
          isOpen={selectedDay === day.day}
          onToggle={() =>
            setSelectedDay(selectedDay === day.day ? null : day.day)
          }
          onShowRestaurants={onShowRestaurants}
        />
      ))}
    </section>
  );
}

export default ItineraryAccordion;
