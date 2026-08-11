import React from 'react'
import "../CSS/travelDetails.css"
import Stepper from "../components/travelDetails/Stepper"
import Destination from '../components/travelDetails/Destination'
import TravelDates from '../components/travelDetails/TravelDates';
import Travelers from '../components/travelDetails/Travelers';
import Budget from '../components/travelDetails/Budget';
import TravelStyle from '../components/travelDetails/TravelStyle';
import TripPreferences from '../components/travelDetails/TripPreferences';
import { LuPlane } from "react-icons/lu";
import { saveTrip } from "../services/travelDetailsAPI";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCurrentStep } from "../Redux/Slice/tripSlice";

import { hideLoading, showLoading } from '../Redux/Slice/CommonStatesSlice';

function TraverlDetails() {
  const {theme,loading} = useSelector((state) => state.commonStates);
  const { currentStep } = useSelector((state) => state.trip);
const trip = useSelector((state) => state.trip);
const dispatch=useDispatch();
const navigate = useNavigate();

  const handleGenerate = async () => {
    try {
      dispatch(setCurrentStep(4));
      dispatch(showLoading());
      const data = await saveTrip(trip);
      dispatch(hideLoading());
      console.log(data);
 
      navigate(`/itinerary/${data.trip._id}`);
    } catch (err) {
      console.error(err);
    }
    finally{
      dispatch(hideLoading());
    }
  };

  return (
    <>
      <Stepper />
      <div className="travel-detail-page">
        {currentStep >= 1 && <Destination />}

        {currentStep >= 2 && (
          <div id="currentStep2">
            <TravelDates />
            <Budget />
            <Travelers />
          </div>
        )}
        {currentStep >= 3 && (
          <div id="currentStep3">
            <TravelStyle />
            <TripPreferences />
          </div>
        )}

        {loading ? (
          <button
            className={`GenerateItinaryBtn ${theme ? "dark-generate-btn" : ""}`}
            type="button"
            disabled
          >
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            Generating...
          </button>
        ) : (
          <button
            className={`GenerateItinaryBtn ${theme ? "dark-generate-btn" : ""}`}
            onClick={handleGenerate}
            disabled={currentStep<3}
          >
            <LuPlane /> <span>Generate My Itinerary</span>
          </button>
        )}
      </div>
    </>
  );
}

export default TraverlDetails
