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

export default function CategoryFilter({ activeCategory, setActiveCategory }) {
  const { theme } = useSelector((state) => state.commonStates);

  return (
    <div className={`categoryFilter ${theme ? "" : "light-categoryFilter"}`}>
      {categories.map((category) => (
        <button
          key={category}
          className={activeCategory === category ? "activeCategory" : ""}
          onClick={() => setActiveCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
