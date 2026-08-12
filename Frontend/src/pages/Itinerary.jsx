import "../CSS/itinerary/itinerary.css";
import ItineraryLoader from "../components/Itinerary/ItineraryLoader";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getItinerary } from "../services/itineraryApi";
import { setItinerary } from "../Redux/Slice/tripSlice";

import HeroBanner from "../components/Itinerary/HeroBanner";
import TripStats from "../components/Itinerary/TripStats";
import ItineraryAccordion from "../components/Itinerary/ItineraryAccordion";
import TripSidebar from "../components/Itinerary/TripSidebar";
import RouteMap from "../components/Itinerary/RouteMap";
import HotelSection from "../components/Itinerary/HotelSection";
import RestaurantSection from "../components/Itinerary/Restaurant/RestaurantSection";
import BottomActions from "../components/Itinerary/BottomActions";
import BudgetSection from "../components/Itinerary/BudgetSection";
import WeatherSection from "../components/Itinerary/WeatherSection";


export default function Itinerary() {
  const [selectedDay, setSelectedDay] = useState(1);
  const [restaurants, setRestaurants] = useState([]);
  const [showRestaurants, setShowRestaurants] = useState(false);
  const [trip, setTrip] = useState(null);
  
  const { tripId } = useParams();
  
  const dispatch = useDispatch();
  
  const token = useSelector((state) => state.user.token);
  
  const itinerary = useSelector((state) => state.trip.itinerary);
  
  const currentDay = itinerary?.days?.find((day) => day.day === selectedDay);


  const handleShowRestaurants = (restaurantList) => {
    setRestaurants(restaurantList);
    setShowRestaurants(true);

    setTimeout(() => {
      document.getElementById("restaurant-section")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };
  


useEffect(() => {
  const fetchTrip = async () => {
    try {
      const token = localStorage.getItem("token");

      console.log("Trip ID:", tripId);
      console.log("Token exists:", !!token);

      if (!token) {
        console.error("No authentication token found");
        return;
      }

      const res = await getItinerary(tripId, token);

      console.log("ITINERARY RESPONSE:", res);

      setTrip(res.trip);

      dispatch(setItinerary(res.itinerary));
    } catch (err) {
      console.error("Itinerary Error:", err.response?.data || err);
    }
  };

  fetchTrip();
}, [tripId, dispatch]);

if (!itinerary) {
  return <ItineraryLoader />;
}

  return (
    <div className="itineraryPage">
      <HeroBanner trip={itinerary.trip} tripId={tripId} />

      {/* <TripStats />
      {/* <RouteMap places={currentDay?.activities || []} day={selectedDay} /> */}

      <div className="itineraryMain">
        <div className="itineraryLeft">
          <ItineraryAccordion
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
            onShowRestaurants={handleShowRestaurants}
          />
        </div>

        <div className="itineraryRight">
          <TripSidebar trip={trip} />
        </div>
      </div>

      <HotelSection
        stays={itinerary.stays}
        accommodation={trip?.preferences?.accommodation}
      />

      {restaurants && restaurants.length > 0 && (
        <RestaurantSection
          restaurants={restaurants}
          showRestaurants={showRestaurants}
        />
      )}
      {/* 
      <BudgetSection /> */}

      <WeatherSection weather={itinerary.weather} />
      {/* 
      <BottomActions />   */}
    </div>
  );
}
