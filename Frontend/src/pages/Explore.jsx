import { useMemo, useState } from "react";
import "../CSS/explore/explore.css";

import { useSelector } from "react-redux";

import SearchBar from "../components/Explore/SearchBar";
import CategoryFilter from "../components/Explore/CategoryFilter";
import DestinationCard from "../components/Explore/DestinationCard";

import { destinations } from "../data/destinations";

export default function Explore() {
  const { theme } = useSelector((state) => state.commonStates);

  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredDestinations = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return destinations.filter((destination) => {
      // Search
      const matchesSearch =
        search === "" ||
        destination.name.toLowerCase().includes(search) ||
        destination.country.toLowerCase().includes(search) ||
        destination.tags.some((tag) => tag.toLowerCase().includes(search));

      // Category
      const matchesCategory =
        activeCategory === "All" ||
        destination.tags.some(
          (tag) => tag.toLowerCase() === activeCategory.toLowerCase(),
        );

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory]);

  return (
    <div className={`explorePage ${theme ? "" : "light-explorePage"}`}>
      <div className="exploreHero">
        <h1>Explore Destinations</h1>

        <p>
          Discover the world's highest-rated destinations and generate your
          perfect AI travel itinerary.
        </p>
      </div>

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <CategoryFilter
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      <div className="destinationGrid">
        {filteredDestinations.length > 0 ? (
          filteredDestinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))
        ) : (
          <div className="noResults">
            <h3>No destinations found</h3>

            <p>
              Try searching for another destination or selecting a different
              category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
