import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { exploreTrips } from "../data/exploreTrips";

import "../CSS/exploreTrip/exploreTrip.css";

import DestinationHero from "../components/ExploreTrip/DestinationHero";
import DestinationOverview from "../components/ExploreTrip/DestinationOverview";
import TopAttractions from "../components/ExploreTrip/TopAttractions";
import Gallery from "../components/ExploreTrip/Gallery";
import BudgetInfo from "../components/ExploreTrip/BudgetInfo";

export default function ExploreTrip() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  const destination = exploreTrips.find((trip) => trip.id === Number(id));

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [id]);

  if (loading) {
    return (
      <div className="exploreTripLoader">
        <div className="loaderDots">
          <span></span>
          <span></span>
          <span></span>
        </div>

        <p>Loading destination...</p>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="exploreTripNotFound">
        <h2>Destination not found</h2>
        <p>The destination you're looking for doesn't exist.</p>
      </div>
    );
  }

  return (
    <div className="exploreTripPage">
      <DestinationHero destination={destination} />

      <DestinationOverview destination={destination} />

      <TopAttractions destination={destination} />

      <Gallery destination={destination} />

      <BudgetInfo destination={destination} />
    </div>
  );
}
