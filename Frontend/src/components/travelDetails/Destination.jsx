import { useEffect, useRef } from "react";

import "../../CSS/travelDetailsCSS/destination.css";

import { FaMapMarkerAlt, FaSearch, FaClock } from "react-icons/fa";

import { useSelector, useDispatch } from "react-redux";

import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";

import { setDestination, setCurrentStep } from "../../Redux/Slice/tripSlice";

const libraries = ["places"];

function Destination() {
  const dispatch = useDispatch();

  const autoCompleteRef = useRef(null);

  const { theme } = useSelector((state) => state.commonStates);

  const destination = useSelector((state) => state.trip.destination);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  // ==========================================
  // GOOGLE PLACE SELECTED
  // ==========================================

  const handlePlaceChanged = () => {
    const place = autoCompleteRef.current?.getPlace();

    if (!place || !place.geometry) return;

    const selectedPlace = {
      name: place.formatted_address || place.name,
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
      placeId: place.place_id,
    };

    dispatch(setDestination(selectedPlace));

    // This is useful on the NEW TRIP page.
    // It is not necessary for edit.
    dispatch(setCurrentStep(2));
  };

  // ==========================================
  // MANUAL INPUT CHANGE
  // ==========================================

  const handleInputChange = (e) => {
    dispatch(
      setDestination({
        ...destination,
        name: e.target.value,
      }),
    );
  };

  // ==========================================
  // THEME
  // ==========================================

  useEffect(() => {
    document.body.classList.toggle("dark-theme", theme);

    return () => {
      document.body.classList.remove("dark-theme");
    };
  }, [theme]);

  return (
    <div className={`destination-card ${theme ? "dark" : "light"}`}>
      {/* Heading */}

      <h3
        className={
          theme ? "dark-heading-destination" : "light-heading-destination"
        }
      >
        Destination
      </h3>

      {/* Search */}

      <div
        className={`search-box ${
          theme ? "dark-search-box" : "light-search-box"
        }`}
      >
        <FaSearch className="search-icon" />

        {isLoaded ? (
          <Autocomplete
            onLoad={(autocomplete) => {
              autoCompleteRef.current = autocomplete;
            }}
            onPlaceChanged={handlePlaceChanged}
          >
            <input
              type="text"
              placeholder="Where do you want to travel?"
              value={destination.name || ""}
              onChange={handleInputChange}
            />
          </Autocomplete>
        ) : (
          <input type="text" placeholder="Loading Google Places..." disabled />
        )}
      </div>
    </div>
  );
}

export default Destination;
