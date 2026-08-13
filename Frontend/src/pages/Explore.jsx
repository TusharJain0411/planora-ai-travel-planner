import { useEffect, useMemo, useState } from "react";
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

  // Loading state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const filteredDestinations = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return destinations.filter((destination) => {
      const matchesSearch =
        search === "" ||
        destination.name.toLowerCase().includes(search) ||
        destination.country.toLowerCase().includes(search) ||
        destination.tags.some((tag) => tag.toLowerCase().includes(search));

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
      {/* HERO */}
      <div className="exploreHero">
        <h1>Explore Destinations</h1>

        <p>
          Discover the world's highest-rated destinations and generate your
          perfect AI travel itinerary.
        </p>
      </div>

      {/* SEARCH */}
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* CATEGORY */}
      <CategoryFilter
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      {/* DESTINATIONS */}
      <div className="destinationGrid">
        {loading ? (
          <DestinationSkeleton count={8} />
        ) : filteredDestinations.length > 0 ? (
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

/* =========================================
   DESTINATION SKELETON
========================================= */

function DestinationSkeleton({ count = 8 }) {
   const { theme } = useSelector((state) => state.commonStates);
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div className={`destinationSkeleton ${theme?"":"light-destinationSkeleton"}`} key={index}>
          {/* IMAGE */}
          <div className="skeletonImage skeletonShimmer" />

          {/* CONTENT */}
          <div className="skeletonContent">
            <div className="skeletonTitle skeletonShimmer" />

            <div className="skeletonLocation skeletonShimmer" />

            <div className="skeletonTags">
              <span className="skeletonTag skeletonShimmer" />
              <span className="skeletonTag skeletonShimmer" />
              <span className="skeletonTag skeletonShimmer" />
            </div>

            <div className="skeletonDescription">
              <span className="skeletonLine skeletonShimmer" />
              <span className="skeletonLine skeletonShimmer" />
            </div>

            <div className="skeletonButton skeletonShimmer" />
          </div>
        </div>
      ))}
    </>
  );
}
