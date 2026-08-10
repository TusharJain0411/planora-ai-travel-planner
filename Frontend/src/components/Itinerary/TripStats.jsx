import "../../CSS/itinerary/tripStats.css";

import { FiDollarSign, FiMap, FiCloud, FiSun } from "react-icons/fi";

import { useSelector } from "react-redux";

const stats = [
  {
    icon: <FiDollarSign />,
    title: "Budget",
    value: "₹85,000",
    subTitle: "Estimated Cost",
  },
  {
    icon: <FiMap />,
    title: "Distance",
    value: "1,240 km",
    subTitle: "Total Travel",
  },
  {
    icon: <FiCloud />,
    title: "Weather",
    value: "22°C",
    subTitle: "Mostly Sunny",
  },
  {
    icon: <FiSun />,
    title: "Best Season",
    value: "Spring",
    subTitle: "March - April",
  },
];

export default function TripStats() {

const {theme}=useSelector((item) => item.commonStates);

  return (
    <section className="tripStats">
      {stats.map((item, index) => (
        <div
          className={`tripStatCard ${theme ? "dark-tripStatCard" : "light-tripStatCard"}`}
          key={index}
        >
          <div className="tripStatIcon">{item.icon}</div>

          <div className="tripStatInfo">
            <h4>{item.title}</h4>

            <h2>{item.value}</h2>

            <p>{item.subTitle}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
