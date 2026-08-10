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

  const destination = exploreTrips.find((trip) => trip.id === Number(id));

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
