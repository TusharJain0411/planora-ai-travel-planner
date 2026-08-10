import React, { useEffect } from "react";

import "../CSS/travelDetails.css";

import Destination from "../components/travelDetails/Destination";
import TravelDates from "../components/travelDetails/TravelDates";
import Travelers from "../components/travelDetails/Travelers";
import Budget from "../components/travelDetails/Budget";
import TravelStyle from "../components/travelDetails/TravelStyle";
import TripPreferences from "../components/travelDetails/TripPreferences";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { getTrip, updateTrip } from "../services/travelDetailsAPI";

import {
  setDestination,
  setTravelDates,
  setTravelers,
  setBudget,
  setTravelStyle,
  setPreferences,
} from "../Redux/Slice/tripSlice";

import { hideLoading, showLoading } from "../Redux/Slice/CommonStatesSlice";

function EditTravelDetails() {
  const { theme, loading } = useSelector((state) => state.commonStates);

  const trip = useSelector((state) => state.trip);

  const token = useSelector((state) => state.user.token);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { tripId } = useParams();

  // --------------------------------
  // LOAD EXISTING TRIP
  // --------------------------------

  useEffect(() => {
    const loadTrip = async () => {
      try {
        dispatch(showLoading());

        const data = await getTrip(tripId, token);

        console.log("EDIT TRIP DATA:", data.trip);

        const existingTrip = data.trip;

        // Destination
        dispatch(setDestination(existingTrip.destination));

        // Dates
        dispatch(setTravelDates(existingTrip.travelDates));

        // Travelers
        dispatch(setTravelers(existingTrip.travelers));

        // Budget
        dispatch(setBudget(existingTrip.budget));

        // Travel style
        dispatch(setTravelStyle(existingTrip.travelStyle));

        // Preferences
        dispatch(setPreferences(existingTrip.preferences));
      } catch (error) {
        console.error("Failed to load trip:", error);
      } finally {
        dispatch(hideLoading());
      }
    };

    if (tripId && token) {
      loadTrip();
    }
  }, [tripId, token, dispatch]);

  // --------------------------------
  // SAVE CHANGES
  // --------------------------------

  const handleSave = async () => {
    try {
      dispatch(showLoading());

      const data = await updateTrip(
        tripId,
        {
          destination: trip.destination,
          travelDates: trip.travelDates,
          travelers: trip.travelers,
          budget: trip.budget,
          travelStyle: trip.travelStyle,
          preferences: trip.preferences,
        },
        token,
      );

      console.log("UPDATED TRIP:", data);

      alert("Trip details updated successfully!");

      navigate(`/itinerary/${tripId}`);
    } catch (error) {
      console.error("Update trip error:", error);

      alert(error.response?.data?.message || "Failed to update trip");
    } finally {
      dispatch(hideLoading());
    }
  };

  return (
    <div className="travelDetailsPage">
      {/* NO STEPPER HERE */}

      <div className="editTravelHeader">
        <div>
          <h1>Edit Trip Details</h1>

          <p>Update your travel preferences and trip information.</p>
        </div>
      </div>

      {/* DESTINATION */}

      <div id="editDestination">
        <Destination />
      </div>

      {/* TRAVEL DATES + BUDGET + TRAVELERS */}

      <div id="editTravelDetails">
        <TravelDates />

        <Budget />

        <Travelers />
      </div>

      {/* STYLE + PREFERENCES */}

      <div id="editPreferences">
        <TravelStyle />

        <TripPreferences />
      </div>

      {/* ACTION BUTTONS */}

      <div className="editTravelActions">
        <button
          type="button"
          className="editCancelBtn"
          onClick={() => navigate(`/itinerary/${tripId}`)}
        >
          Cancel
        </button>

        <button
          type="button"
          className={`GenerateItinaryBtn ${theme ? "dark-generate-btn" : ""}`}
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

export default EditTravelDetails;
