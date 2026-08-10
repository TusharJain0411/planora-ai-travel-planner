import "../../../CSS/itinerary/Restaurant/RestaurantCard.css";
import{useSelector} from "react-redux"

export default function RestaurantCard({ restaurant }) {
   const {theme}=useSelector((state)=>state.commonStates);

  const handleViewOnMaps = () => {
    if (restaurant.googleMapsUri) {
      window.open(restaurant.googleMapsUri, "_blank", "noopener,noreferrer");
      return;
    }

    if (restaurant.location?.lat != null && restaurant.location?.lng != null) {
      const url =
        `https://www.google.com/maps/search/?api=1` +
        `&query=${restaurant.location.lat},${restaurant.location.lng}`;

      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className={`restaurant-card ${theme?"":"light-restaurant-card"}`}>
      {/* Image */}

      {restaurant.image && (
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="restaurant-image"
        />
      )}

      <div className="restaurant-info">
        <h4>{restaurant.name}</h4>

        {/* Rating */}

        <p>
          ⭐ {restaurant.rating ? Number(restaurant.rating).toFixed(1) : "N/A"}
        </p>

        {/* Cuisine */}

        <p>🍽 {restaurant.cuisine}</p>


        {/* Food Type */}

        <p>
          {restaurant.foodType === "Veg" && "🌱 Veg Only"}

          {restaurant.foodType === "Non-Veg" && "🍗 Non-Veg"}

          {restaurant.foodType === "Both" && "🥗 Veg & Non-Veg"}
        </p>

        {/* Distance */}

        <p>📍 {restaurant.distance}</p>

  

        <button type="button" onClick={handleViewOnMaps}>
          📍 View on Maps
        </button>
      </div>
    </div>
  );
}
