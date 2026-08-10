import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentStep: 1,
  destination: {
    name: "",
    placeId: "",
    lat: null,
    lng: null,
  },

  travelDates: {
    startDate: null,
    endDate: null,
    duration: 0,
  },

  travelers: {
    adults: 1,
    children: 1,
    infants: 0,
    rooms: 1,
  },

  budget: {
    amount: 1000,
    category: "Economy",
  },

  travelStyle: {
    style: "Solo",
    interests: [],
  },

  preferences: {
    transport: "Flight",
    accommodation: "Hotel",
    food: "Vegetarian",
    extras: [],
  },
  itinerary: null,
};

const tripSlice = createSlice({
  name: "trip",
  initialState,

  reducers: {
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },

    setDestination(state, action) {
      state.destination = action.payload;
    },

    setTravelDates(state, action) {
      state.travelDates = action.payload;
    },

    setTravelers(state, action) {
      state.travelers = action.payload;
    },

    setBudget(state, action) {
      state.budget = action.payload;
    },

    setTravelStyle(state, action) {
      state.travelStyle = action.payload;
    },

    setPreferences(state, action) {
      state.preferences = action.payload;
    },

    resetTrip() {
      return initialState;
    },

    setItinerary: (state, action) => {
      state.itinerary = action.payload;
    },
  },
});

export const {
  setDestination,
  setTravelDates,
  setTravelers,
  setBudget,
  setTravelStyle,
  setPreferences,
  resetTrip,
  setCurrentStep,
  setItinerary,
} = tripSlice.actions;

export default tripSlice.reducer;
