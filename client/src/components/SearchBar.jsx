import { useState, useEffect, useRef } from "react";

export default function SearchBar({ onSelect }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const debounceRef = useRef(null);

  const handleSearch = (value) => {
    setQuery(value);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (value.length > 2) {
      debounceRef.current = setTimeout(async () => {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${value}&addressdetails=1&limit=5`
        );
        const data = await res.json();
        setResults(data);
      }, 300); // ⏳ debounce 300ms
    } else {
      setResults([]);
    }
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
  };

  return (
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-80 z-[1000]">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Cerca un indirizzo..."
          className="w-full px-4 py-2 rounded-lg shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        )}
      </div>

      {results.length > 0 && (
        <ul className="bg-white shadow-lg rounded-lg mt-2 max-h-60 overflow-y-auto">
          {results.map((place, i) => (
            <li
              key={i}
              onClick={() => {
                onSelect([place.lat, place.lon], place.display_name);
                setQuery(place.display_name);
                setResults([]);
              }}
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
