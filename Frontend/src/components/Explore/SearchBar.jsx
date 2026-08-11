import { FiSearch, FiX } from "react-icons/fi";

import "../../CSS/explore/searchBar.css";

import { useSelector } from "react-redux";

export default function SearchBar({ searchTerm, setSearchTerm }) {
  const { theme } = useSelector((state) => state.commonStates);

  const handleClear = () => {
    setSearchTerm("");
  };

  return (
    <div className={`searchBar ${theme ? "" : "light-searchBar"}`}>
      <FiSearch />

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search destinations, countries, cities..."
      />

      {searchTerm && (
        <button className="clearSearch" onClick={handleClear} type="button">
          <FiX />
        </button>
      )}
    </div>
  );
}
