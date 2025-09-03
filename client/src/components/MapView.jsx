import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import SearchBar from "./SearchBar";
import LocateButton from "./LocateButton";

// ✅ Fix icone default Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// ✅ Icona personalizzata per la posizione utente
const userIcon = new L.Icon({
  iconUrl:
    "data:image/svg+xml;utf8," +
    encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32">
        <circle cx="16" cy="16" r="10" fill="#1E88E5" stroke="white" stroke-width="3"/>
      </svg>
    `),
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16],
});

// ✅ Icona personalizzata per i parcheggi disabili
const parkingIcon = new L.Icon({
  iconUrl: "/marker.svg",
  iconSize: [32, 32], // dimensioni icona
  iconAnchor: [16, 32], // punta in basso
  popupAnchor: [0, -32], // popup sopra l’icona
});

export default function MapView() {
  const [markers, setMarkers] = useState([]);
  const [center, setCenter] = useState([44.4056, 8.9463]); // Centro Genova
  const [userPos, setUserPos] = useState(null);
  const [zoom, setZoom] = useState(14);
  const mapRef = useRef();

  // ✅ Carica parcheggi dal backend
  useEffect(() => {
    fetch("/parking")
      .then((res) => res.json())
      .then((data) => setMarkers(data));
  }, []);

  // ✅ Aggiorna zoom
  const handleZoom = () => {
    if (mapRef.current) {
      setZoom(mapRef.current.getZoom());
    }
  };

  // ✅ Callback SearchBar
  const handleSelectPlace = (coords) => {
    const lat = parseFloat(coords[0]);
    const lon = parseFloat(coords[1]);

    if (mapRef.current) {
      mapRef.current.setView([lat, lon], 17, { animate: true });
    }
  };

  return (
    <div className="flex justify-center px-4 py-6">
      <div className="relative w-full max-w-6xl">
        {/* Barra ricerca */}
        <SearchBar onSelect={handleSelectPlace} />

        {/* Mappa */}
        <MapContainer
          center={center}
          zoom={zoom}
          ref={mapRef}
          whenReady={(map) => {
            map.target.on("zoomend", handleZoom);
          }}
          className="w-full h-[70vh] rounded-xl shadow-lg"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
          />

          {/* Marker parcheggi */}
          {zoom >= 14 &&
            markers.map((m) => (
              <Marker
                key={m.id}
                position={[parseFloat(m.lat), parseFloat(m.lng)]}
                icon={parkingIcon}
              >
                <Popup>
                  <div className="p-3 bg-white rounded-xl shadow-md text-gray-800 w-60">
                    <h3 className="font-bold text-lg text-blue-600 mb-1">
                      {m.indirizzo}
                    </h3>

                    {m.descrizione && (
                      <p className="text-sm text-gray-600 mb-2">
                        {m.descrizione}
                      </p>
                    )}

                    <p className="text-xs text-gray-500 mb-3">📍 {m.comune}</p>

                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${m.lat},${m.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center bg-blue-600 text-white font-semibold py-2 rounded-lg shadow hover:bg-blue-700 transition !text-white"
                    >
                      Vai con Google Maps
                    </a>
                  </div>
                </Popup>
              </Marker>
            ))}

          {/* Marker utente */}
          {userPos && (
            <Marker position={userPos} icon={userIcon}>
              <Popup>Sei qui</Popup>
            </Marker>
          )}

          {/* Bottone localizzazione */}
          <LocateButton setUserPos={setUserPos} setCenter={setCenter} />
        </MapContainer>
      </div>
    </div>
  );
}
