import { useEffect, useState } from "react";
import TripCard from "../components/Trips/TripCard";
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

  if (loading) {
    return <p>Loading trips...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className="tripsPage">
      <div className="tripsGrid">
        {trips.length > 0 ? (
          trips.map((trip) => <TripCard key={trip._id} trip={trip} />)
        ) : (
          <p>No trips found.</p>
        )}
      </div>
    </section>
  );
}
