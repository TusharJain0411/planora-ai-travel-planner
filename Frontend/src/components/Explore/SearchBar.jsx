import { FiSearch } from "react-icons/fi";

import "../../CSS/explore/searchBar.css";
import { useSelector } from "react-redux";

export default function SearchBar() {
    const { theme } = useSelector((state) => state.commonStates);

  return (
    <div className={`searchBar ${theme?"":"light-searchBar"}`}>
      <FiSearch />

      <input
        type="text"
        placeholder="Search destinations, countries, cities..."
      />
    </div>
  );
}
