import "../CSS/explore/explore.css";
import { useSelector } from "react-redux";
import SearchBar from "../components/Explore/SearchBar";
import CategoryFilter from "../components/Explore/CategoryFilter";
import DestinationCard from "../components/Explore/DestinationCard";
import { destinations } from "../data/destinations";

export default function Explore() {
  
const {theme}=useSelector((state)=>state.commonStates);
  
    return (
      <div className={`explorePage ${theme ? "" : "light-explorePage"}`}>
        <div className="exploreHero">
          <h1>Explore Destinations</h1>

          <p>
            Discover the world's highest-rated destinations and generate your
            perfect AI travel itinerary.
          </p>
        </div>

        <SearchBar />

        <CategoryFilter />

        <div className="destinationGrid">
          {destinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>

        
      </div>
    );
}
