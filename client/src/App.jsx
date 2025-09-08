import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import MapView from "./components/MapView";
import Footer from "./components/Footer";
import InstallPrompt from "./components/InstallPrompt";
import Segnalazioni from "./pages/Segnalazioni";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h2 className="text-center text-3xl font-bold mt-6 mb-4 text-gray-700">
                  Trova il parcheggio più vicino a te
                </h2>
                <MapView />
              </>
            }
          />
          <Route path="/segnalazioni" element={<Segnalazioni />} />
        </Routes>
      </main>
      <Footer />
      {/* Popup installazione PWA */}
      <InstallPrompt />
    </div>
  );
}
