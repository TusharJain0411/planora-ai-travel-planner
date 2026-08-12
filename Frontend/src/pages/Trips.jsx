import { useEffect, useState } from "react";

import TripCard from "../components/Trips/TripCard";
import TripCardSkeleton from "../components/Trips/TripCardSkeleton";

import { fetchTripsAPI } from "../services/tripsActionAPI";

import "../CSS/trips.css";

export default function Trips() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadTrips = async () => {
      try {
        const data = await fetchTripsAPI();

        setTrips(data);
      } catch (error) {
        console.error("Error fetching trips:", error);
        setError("Failed to load trips");
      } finally {
        setLoading(false);
      }
    };

    loadTrips();
  }, []);

  if (error) {
    return (
      <section className="tripsPage">
        <p>{error}</p>
      </section>
    );
  }

  return (
    <section className="tripsPage">
      <div className="tripsGrid">
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <TripCardSkeleton key={index} />
          ))
        ) : trips.length > 0 ? (
          trips.map((trip) => <TripCard key={trip._id} trip={trip} />)
        ) : (
          <p>No trips found.</p>
        )}
      </div>
    </section>
  );
}
