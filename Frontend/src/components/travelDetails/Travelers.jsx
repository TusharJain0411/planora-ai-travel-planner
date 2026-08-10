import "../../CSS/travelDetailsCSS/travelers.css";
import {
  FaUsers,
  FaUser,
  FaBed,
  FaMinus,
  FaPlus,
  FaChild,
  FaHeart,
} from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import { setTravelers } from "../../Redux/Slice/tripSlice";

function Travelers() {
  const dispatch = useDispatch();

  const { theme } = useSelector((state) => state.commonStates);

  const travelers = useSelector((state) => state.trip.travelers);

  const updateTraveler = (field, value) => {
    dispatch(
      setTravelers({
        ...travelers,
        [field]: value,
      }),
    );
  };

  const cards = [
    {
      title: "Adults",
      subtitle: "18+ years",
      icon: <FaUser />,
      field: "adults",
      value: travelers.adults,
      min: 1,
    },
    {
      title: "Children",
      subtitle: "2–17 years",
      icon: <FaChild />,
      field: "children",
      value: travelers.children,
      min: 0,
    },
    {
      title: "Infants",
      subtitle: "Under 2",
      icon: <FaHeart />,
      field: "infants",
      value: travelers.infants,
      min: 0,
    },
    {
      title: "Rooms",
      subtitle: "Hotel rooms",
      icon: <FaBed />,
      field: "rooms",
      value: travelers.rooms,
      min: 1,
    },
  ];

  

  return (
    <section
      className={`travelers-section ${theme ? "" : "light-travelers-section"}`}
    >
      <div className="travelers-heading">
        <div className="travelers-icon">
          <FaUsers />
        </div>

        <h2>Travelers</h2>
      </div>

      <div className="travelers-grid">
        {cards.map((item) => (
          <div className="traveler-card" key={item.title}>
            <div className="traveler-circle">{item.icon}</div>

            <div>
              <h3>{item.title}</h3>
              <p>{item.subtitle}</p>
            </div>

            <div className="counter">
              <button
                disabled={item.value === item.min}
                onClick={() =>
                  updateTraveler(item.field, Math.max(item.min, item.value - 1))
                }
              >
                <FaMinus />
              </button>

              <span>{item.value}</span>

              <button
                onClick={() =>
                  updateTraveler(item.field, Math.min(10, item.value + 1))
                }
              >
                <FaPlus />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Travelers;
