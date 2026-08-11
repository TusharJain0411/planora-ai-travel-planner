import "../../CSS/travelDetailsCSS/TravelStyle.css";
import {
  FaHeart,
  FaUser,
  FaUsers,
  FaUserFriends,
  FaUmbrellaBeach,
  FaMountain,
  FaLeaf,
  FaUtensils,
  FaCamera,
  FaShoppingBag,
  FaTree,
  FaLandmark,
  FaShip,
  FaGlassCheers,
} from "react-icons/fa";
import { GiBackpack } from "react-icons/gi";
import { MdTravelExplore } from "react-icons/md";
import { PiMountains } from "react-icons/pi";

import { useDispatch, useSelector } from "react-redux";
import { setTravelStyle } from "../../Redux/Slice/tripSlice";

function TravelStyle() {
  const dispatch = useDispatch();

  const { theme } = useSelector((state) => state.commonStates);

  const { style, interests: selectedInterests } = useSelector(
    (state) => state.trip.travelStyle,
  );

  const styles = [
    { title: "Solo", icon: <FaUser /> },
    { title: "Couple", icon: <FaHeart /> },
    { title: "Family", icon: <FaUsers /> },
    { title: "Friends", icon: <FaUserFriends /> },
    { title: "Backpacking", icon: <GiBackpack /> },
    { title: "Adventure", icon: <PiMountains /> },
  ];

  const interests = [
    { name: "Beach", icon: <FaUmbrellaBeach /> },
    { name: "Mountains", icon: <FaMountain /> },
    { name: "Nature", icon: <FaLeaf /> },
    { name: "Food", icon: <FaUtensils /> },
    { name: "Photography", icon: <FaCamera /> },
    { name: "Shopping", icon: <FaShoppingBag /> },
    { name: "Wildlife", icon: <FaTree /> },
    { name: "History", icon: <FaLandmark /> },
    { name: "Cruise", icon: <FaShip /> },
    { name: "Nightlife", icon: <FaGlassCheers /> },
  ];

  const changeStyle = (selectedStyle) => {
    dispatch(
      setTravelStyle({
        style: selectedStyle,
        interests: selectedInterests,
      }),
    );
  };

  const toggleInterest = (interest) => {
    let updatedInterests;

    if (selectedInterests.includes(interest)) {
      updatedInterests = selectedInterests.filter((item) => item !== interest);
    } else {
      updatedInterests = [...selectedInterests, interest];
    }

    dispatch(
      setTravelStyle({
        style,
        interests: updatedInterests,
      }),
    );
  };

  return (
    <section
      className={`travel-style-section ${theme ? "" : "light-travel-style"}`}
    >
      <div className="style-header">
        <div className="style-icon">
          <MdTravelExplore />
        </div>

        <div>
          <h2>Travel Style & Interests</h2>
          <p>Tell AI what kind of trip you love</p>
        </div>
      </div>

      <h3 className="sub-heading">Travel Style</h3>

      <div className="style-grid">
        {styles.map((item) => (
          <div
            key={item.title}
            className={`style-card ${
              style === item.title ? `active-${item.title}` : ""
            }`}
            onClick={() => changeStyle(item.title)}
          >
            <div className="style-card-icon">{item.icon}</div>

            <span>{item.title}</span>
          </div>
        ))}
      </div>

      <h3 className="sub-heading">Interests</h3>

      <div className="interest-grid">
        {interests.map((item) => (
          <button
            key={item.name}
            type="button"
            className={`interest-chip ${
              selectedInterests.includes(item.name) ? "active-chip" : ""
            }`}
            onClick={() => toggleInterest(item.name)}
          >
            {item.icon}
            <span>{item.name}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

export default TravelStyle;
