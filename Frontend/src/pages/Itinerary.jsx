import "../CSS/itinerary/itinerary.css";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getItinerary } from "../services/itineraryApi";
import { setItinerary } from "../Redux/Slice/tripSlice";

import HeroBanner from "../components/Itinerary/HeroBanner";
import TripStats from "../Components/Itinerary/TripStats";
import ItineraryAccordion from "../Components/Itinerary/ItineraryAccordion";
import TripSidebar from "../Components/Itinerary/TripSidebar";
import RouteMap from "../Components/Itinerary/RouteMap";
import HotelSection from "../Components/Itinerary/HotelSection";
import RestaurantSection from "../Components/Itinerary/Restaurant/RestaurantSection";
import BottomActions from "../Components/Itinerary/BottomActions";
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
      const res = await getItinerary(tripId, token);

      console.log("ITINERARY RESPONSE:", res);

      setTrip(res.trip);

      dispatch(setItinerary(res.itinerary));
    } catch (err) {
      console.log(err);
    }
  };

  fetchTrip();
}, [tripId, token, dispatch]);

if (!itinerary) {
  return <h2>Loading...</h2>;
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
