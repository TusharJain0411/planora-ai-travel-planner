import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const saveTrip = async (tripData) => {
  const token = localStorage.getItem("token");

  const response = await API.post("/api/trips/create", tripData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};


// UPDATE TRIP
export const updateTrip = async (tripId, tripData) => {
  const token = localStorage.getItem("token");

  const response = await API.put(
    `/api/trips/${tripId}`,
    tripData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// GET SINGLE TRIP
export const getTrip = async (tripId) => {
  const token = localStorage.getItem("token");

  const response = await API.get(
    `/api/trips/${tripId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};