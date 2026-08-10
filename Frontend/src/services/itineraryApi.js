import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const getItinerary = async (tripId, token) => {
  const response = await axios.get(`${API}/api/itinerary/${tripId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
