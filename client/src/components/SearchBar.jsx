import { useState, useRef } from "react";

export default function SearchBar({ onSelect }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const timeoutRef = useRef(null);

  const fetchSuggestions = async (value) => {
    if (value.length > 2) {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${value}&addressdetails=1&limit=5`
      );
      const data = await res.json();
      setResults(data);
    } else {
      setResults([]);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    // ✅ debounce per fluidità
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      fetchSuggestions(value);
    }, 300);
  };

  const handleSelect = (place) => {
    onSelect([place.lat, place.lon], place.display_name);
    setQuery(place.display_name);
    setResults([]);
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
  };

  return (
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-80 z-[2000]">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Cerca un indirizzo..."
          className="w-full px-4 py-2 pr-10 rounded-lg shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {/* Bottone X per cancellare */}
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        )}
      </div>

      {results.length > 0 && (
        <ul className="absolute w-full bg-white shadow-lg rounded-lg mt-2 max-h-60 overflow-y-auto z-[3000]">
          {results.map((place, i) => (
            <li
              key={i}
              onClick={() => handleSelect(place)}        // ✅ PC
              onTouchStart={() => handleSelect(place)}   // ✅ Mobile
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              {place.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
