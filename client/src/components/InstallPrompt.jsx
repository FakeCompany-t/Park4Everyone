import { useEffect, useState } from "react";

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log("Install outcome:", outcome);
    setDeferredPrompt(null);
    setVisible(false);
  };

  const handleClose = () => setVisible(false);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white shadow-lg rounded-xl p-4 flex items-center gap-4 z-[2000]">
      <p className="text-gray-700">Vuoi installare <b>Park4Everyone</b>?</p>
      <button
        onClick={handleInstall}
        className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition"
      >
        Installa
      </button>
      <button
        onClick={handleClose}
        className="text-gray-500 hover:text-gray-700 transition"
      >
        ✕
      </button>
    </div>
  );
}
