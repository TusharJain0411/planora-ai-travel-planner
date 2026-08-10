import "../../CSS/travelDetailsCSS/tripPreferences.css";
import {
  FaPlane,
  FaTrain,
  FaCar,
  FaShip,
  FaBus,
  FaHotel,
  FaHome,
  FaUmbrellaBeach,
  FaWifi,
  FaSwimmingPool,
  FaDog,
  FaParking,
  FaUtensils,
  FaCog,
} from "react-icons/fa";
import { MdHotel, MdFreeBreakfast, MdAccessible } from "react-icons/md";
import { GiVillage } from "react-icons/gi";

import { useDispatch, useSelector } from "react-redux";
import { setPreferences } from "../../Redux/Slice/tripSlice";


function TripPreferences() {
  const dispatch = useDispatch();

  const { theme } = useSelector((state) => state.commonStates);

  const { transport, accommodation, food, extras } = useSelector(
    (state) => state.trip.preferences,
  );

  const transportOptions = [
    { title: "Flight", icon: <FaPlane /> },
    { title: "Train", icon: <FaTrain /> },
    { title: "Road Trip", icon: <FaCar /> },
    { title: "Bus", icon: <FaBus /> },
    { title: "Cruise", icon: <FaShip /> },
  ];

  const stayOptions = [
    { title: "Hotel", icon: <FaHotel /> },
    { title: "Villa", icon: <FaHome /> },
    { title: "Homestay", icon: <GiVillage /> },
    { title: "Hostel", icon: <MdHotel /> },
    { title: "Resort", icon: <FaUmbrellaBeach /> },
  ];

  const foodOptions = ["Vegetarian", "Non-Veg", "Vegan", "Jain"];

  const extraOptions = [
    { title: "Breakfast", icon: <MdFreeBreakfast /> },
    { title: "Swimming Pool", icon: <FaSwimmingPool /> },
    { title: "WiFi", icon: <FaWifi /> },
    { title: "Parking", icon: <FaParking /> },
    { title: "Pet Friendly", icon: <FaDog /> },
    { title: "Accessible", icon: <MdAccessible /> },
  ];

  const updatePreference = (field, value) => {
    dispatch(
      setPreferences({
        transport,
        accommodation,
        food,
        extras,
        [field]: value,
      }),
    );
  };

  const toggleExtra = (title) => {
    let updatedExtras;

    if (extras.includes(title)) {
      updatedExtras = extras.filter((item) => item !== title);
    } else {
      updatedExtras = [...extras, title];
    }

    dispatch(
      setPreferences({
        transport,
        accommodation,
        food,
        extras: updatedExtras,
      }),
    );
  };


  return (
    <section className={`trip-pref-section ${theme ? "" : "light-trip-pref"}`}>
      <div className="trip-header">
        <div className="trip-icon">
          <FaCog />
        </div>

        <div>
          <h2>Trip Preferences</h2>
          <p>Customize your perfect journey</p>
        </div>
      </div>

      {/* Transportation */}

      <h3 className="trip-subtitle">Transportation</h3>

      <div className="trip-grid">
        {transportOptions.map((item) => (
          <div
            key={item.title}
            className={`trip-card ${
              transport === item.title ? "active-trip-card" : ""
            }`}
            onClick={() => updatePreference("transport", item.title)}
          >
            <div className="trip-card-icon">{item.icon}</div>

            <span>{item.title}</span>
          </div>
        ))}
      </div>

      {/* Accommodation */}

      <h3 className="trip-subtitle">Accommodation</h3>

      <div className="trip-grid">
        {stayOptions.map((item) => (
          <div
            key={item.title}
            className={`trip-card ${
              accommodation === item.title ? "active-trip-card" : ""
            }`}
            onClick={() => updatePreference("accommodation", item.title)}
          >
            <div className="trip-card-icon">{item.icon}</div>

            <span>{item.title}</span>
          </div>
        ))}
      </div>

      {/* Food */}

      <h3 className="trip-subtitle">Food Preference</h3>

      <div className="food-options">
        {foodOptions.map((item) => (
          <button
            type="button"
            key={item}
            className={`food-chip ${food === item ? "active-food" : ""}`}
            onClick={() => updatePreference("food", item)}
          >
            <FaUtensils />
            {item}
          </button>
        ))}
      </div>

      {/* Extras */}

      <h3 className="trip-subtitle">Special Requirements</h3>

      <div className="extras-grid">
        {extraOptions.map((item) => (
          <button
            type="button"
            key={item.title}
            className={`extra-chip ${
              extras.includes(item.title) ? "active-extra" : ""
            }`}
            onClick={() => toggleExtra(item.title)}
          >
            {item.icon}
            <span>{item.title}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

export default TripPreferences;
