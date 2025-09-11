import React, { useEffect, useState, useRef, lazy, Suspense } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import SearchBar from "./SearchBar";
import LocateButton from "./LocateButton";

// ✅ Lazy load di react-leaflet (meglio per performance)
const MapContainer = lazy(() =>
  import("react-leaflet").then((m) => ({ default: m.MapContainer }))
);
const TileLayer = lazy(() =>
  import("react-leaflet").then((m) => ({ default: m.TileLayer }))
);
const Marker = lazy(() =>
  import("react-leaflet").then((m) => ({ default: m.Marker }))
);
const Popup = lazy(() =>
  import("react-leaflet").then((m) => ({ default: m.Popup }))
);

// ✅ Fix icone default Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// ✅ Icona personalizzata per la posizione utente (inline SVG Base64)
const userIcon = new L.Icon({
  iconUrl:
    "data:image/svg+xml;base64," +
    btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32">
        <circle cx="16" cy="16" r="10" fill="#1E88E5" stroke="white" stroke-width="3"/>
      </svg>
    `),
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16],
});

// ✅ Icona personalizzata per parcheggi (SVG inline)
const parkingIcon = new L.Icon({
  iconUrl:
    "data:image/svg+xml;base64," +
    btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32">
        <path d="M16 2C9.4 2 4 7.4 4 14c0 9.3 12 18 12 18s12-8.7 12-18c0-6.6-5.4-12-12-12zm0 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" fill="#1976D2"/>
      </svg>
    `),
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

export default function MapView() {
  const [markers, setMarkers] = useState([]);
  const [center, setCenter] = useState([44.4056, 8.9463]); // Genova
  const [userPos, setUserPos] = useState(null);
  const [zoom, setZoom] = useState(14);
  const mapRef = useRef();

  // ✅ Carica parcheggi dal backend con cache semplice
  useEffect(() => {
    let abort = false;
    fetch("/parking")
      .then((res) => res.json())
      .then((data) => {
        if (!abort) setMarkers(data);
      })
      .catch(console.error);
    return () => {
      abort = true;
    };
  }, []);

  // ✅ Aggiorna zoom senza ricalcoli inutili
  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current;
      map.on("zoomend", () => setZoom(map.getZoom()));
    }
  }, []);

  // ✅ Callback SearchBar
  const handleSelectPlace = (coords) => {
    const lat = parseFloat(coords[0]);
    const lon = parseFloat(coords[1]);
    if (mapRef.current) {
      mapRef.current.setView([lat, lon], 17, { animate: true });
    }
  };

  return (
    <main role="main" className="flex justify-center px-4 py-6">
      <div className="relative w-full max-w-6xl">
        {/* Barra ricerca */}
        <SearchBar onSelect={handleSelectPlace} />

        {/* Mappa con lazy load */}
        <Suspense fallback={<div className="text-center">Caricamento mappa…</div>}>
          <MapContainer
            center={center}
            zoom={zoom}
            ref={mapRef}
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
                    <div
                      className="p-3 bg-white rounded-xl shadow-md text-gray-800 w-60"
                      aria-label={`Parcheggio a ${m.indirizzo}`}
                    >
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
                        aria-label={`Ottieni indicazioni per ${m.indirizzo}`}
                        className="block w-full text-center bg-blue-600 text-white font-semibold py-2 rounded-lg shadow hover:bg-blue-700 transition"
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
                <Popup aria-label="La tua posizione">Sei qui</Popup>
              </Marker>
            )}

            {/* Bottone localizzazione */}
            <LocateButton setUserPos={setUserPos} setCenter={setCenter} />
          </MapContainer>
        </Suspense>
      </div>
    </main>
  );
}
