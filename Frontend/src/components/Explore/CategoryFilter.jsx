import { useState } from "react";

import "../../CSS/explore/categoryFilter.css";

import { useSelector } from "react-redux";

const categories = [
  "All",
  "Beach",
  "Mountains",
  "Cities",
  "Nature",
  "Adventure",
  "Luxury",
  "Historical",
  "Island",
];

export default function CategoryFilter() {

  const [active, setActive] = useState("All");
  const { theme } = useSelector((state) => state.commonStates);

  return (
    <div className={`categoryFilter ${theme?"":"light-categoryFilter"}`}>
      {categories.map((category) => (
        <button
          key={category}
          className={active === category ? "activeCategory" : ""}
          onClick={() => setActive(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
