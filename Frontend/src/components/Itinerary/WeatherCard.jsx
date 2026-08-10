import { FiDroplet, FiWind } from "react-icons/fi";

import "../../CSS/itinerary/weatherCard.css";

import { useSelector } from "react-redux";

export default function WeatherCard({ weather }) {
  const { theme } = useSelector((state) => state.commonStates);

  const date = new Date(weather.date);

  const day = date.toLocaleDateString("en-US", {
    weekday: "short",
  });

  const formattedDate = date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
  });

  return (
    <div className={`weatherCard ${theme ? "" : "lightWeatherCard"}`}>
      {/* Day */}
      <div className="weatherDay">{day}</div>

      {/* Date */}
      <span className="weatherDate">{formattedDate}</span>

      {/* Weather Icon */}
      <div className="weatherIcon">{weather.icon}</div>

      {/* Temperature */}
      <h2>{Math.round(weather.maxTemp)}°</h2>

      {/* Condition */}
      <p className="weatherCondition">{weather.condition}</p>

      {/* Weather Information */}
      <div className="weatherInfo">
        {/* Humidity */}
        <div>
          <FiDroplet />

          <span>{Math.round(weather.humidity)}%</span>
        </div>

        {/* Wind */}
        <div>
          <FiWind />

          <span>{Math.round(weather.wind)} km/h</span>
        </div>
      </div>
    </div>
  );
}
