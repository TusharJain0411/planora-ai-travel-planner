import {
  FiMapPin,
  FiStar,
  FiWifi,
  FiCoffee,
  FiArrowRight,
} from "react-icons/fi";

import { IoPaperPlane } from "react-icons/io5";
import { MdPool } from "react-icons/md";
import { FaDumbbell } from "react-icons/fa6";

import { useSelector } from "react-redux";

import "../../CSS/itinerary/hotelCard.css";

function HotelCard({ hotel }) {
  const { theme } = useSelector((state) => state.commonStates);

  const getAmenityIcon = (amenity) => {
    switch (amenity.toLowerCase()) {
      case "free wifi":
      case "wifi":
        return <FiWifi />;

      case "breakfast":
      case "cafe":
        return <FiCoffee />;

      case "pool":
      case "swimming pool":
        return <MdPool />;

      case "gym":
        return <FaDumbbell />;

      case "airport":
        return <IoPaperPlane />;

      default:
        return <FiStar />;
    }
  };

  return (
    <div className={`hotelCard ${theme ? "" : "lightHotelCard"}`}>
      {/* Image */}

      <div className="hotelImage">
        <img
          src={
            hotel.image ||
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200"
          }
          alt={hotel.name}
        />

        <div className="hotelRating">
          <FiStar />
          {hotel.rating ? hotel.rating.toFixed(1) : "New"}
        </div>
      </div>

      {/* Body */}

      <div className="hotelBody">
        <div>
          <h3>{hotel.name}</h3>

          <p className="hotelDistance">
            {hotel.reviews ? `${hotel.reviews} reviews` : "Reviews unavailable"}
          </p>

          <div className="hotelAmenities">
            {hotel.amenities?.map((item, index) => (
              <span key={index}>
                {getAmenityIcon(item)}
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="hotelFooter">
          <div className="hotelPrice">
            <h4>{hotel.price || "Check price"}</h4>

            {hotel.price && <span>/ night</span>}
          </div>

          <div className={`hotelButtons ${theme ? "" : "light-hotelButtons"}`}>
            <button
              className="bookBtn"
              onClick={() => {
                if (hotel.mapUrl) {
                  window.open(hotel.mapUrl, "_blank");
                }
              }}
            >
              View Stay
              <FiArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HotelCard;
