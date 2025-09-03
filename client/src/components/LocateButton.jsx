import { useState } from "react";
import { useMap } from "react-leaflet";

export default function LocateButton({ setUserPos, setCenter }) {
  const map = useMap();
  const [error, setError] = useState(null);

  const locateUser = () => {
    if (!navigator.geolocation) {
      setError("Geolocalizzazione non supportata dal tuo browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setUserPos([lat, lng]);
        setCenter([lat, lng]);
        map.flyTo([lat, lng], 16);
        setError(null);
      },
      (err) => {
        console.error("Geolocation error:", err);
        if (err.code === err.PERMISSION_DENIED) {
          setError(
            "Permesso negato. Su Safari vai in Impostazioni → Privacy → Localizzazione → Safari e abilita l’accesso."
          );
        } else if (err.code === err.POSITION_UNAVAILABLE) {
          setError("Posizione non disponibile. Attiva GPS o rete.");
        } else if (err.code === err.TIMEOUT) {
          setError("Tempo scaduto, riprova.");
        } else {
          setError("Errore nella geolocalizzazione.");
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  };

  return (
    <>
      <div
        onClick={locateUser}
        className="absolute bottom-4 right-4 bg-white rounded-full shadow-lg p-3 cursor-pointer hover:bg-gray-100 z-[1000]"
        style={{ width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="gray" viewBox="0 0 24 24">
          <path d="M12 8a4 4 0 100 8 4 4 0 000-8zm9 3h-2.07A7.002 7.002 0 0013 5.07V3h-2v2.07A7.002 7.002 0 005.07 11H3v2h2.07A7.002 7.002 0 0011 18.93V21h2v-2.07A7.002 7.002 0 0018.93 13H21v-2z" />
        </svg>
      </div>

      {error && (
        <div className="absolute bottom-20 right-4 max-w-xs bg-red-600 text-white text-sm p-3 rounded-lg shadow-lg z-[1000]">
          {error}
        </div>
      )}
    </>
  );
}
