import { useRef, useState } from "react";
import emailjs from "emailjs-com";

export default function Segnalazioni() {
  const form = useRef();
  const [statusMessage, setStatusMessage] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_ff2a6vc",   // 👉 sostituisci con il tuo Service ID
        "template_npvo6dj",  // 👉 sostituisci con il tuo Template ID
        form.current,
        "IjlNArk-6wka8RVic"  // 👉 sostituisci con la tua Public Key
      )
      .then(
        () => {
          setStatusMessage("✅ Segnalazione inviata con successo!");
          form.current.reset();
        },
        (error) => {
          console.error(error.text);
          setStatusMessage("❌ Errore nell'invio della segnalazione.");
        }
      );
  };

  return (
    <div className="flex flex-col items-center px-4 py-8">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Segnalazioni</h2>
      <p className="text-gray-700 text-center max-w-2xl mb-6">
        Qui puoi aiutarci a migliorare la mappa segnalando nuovi posti auto riservati 
        alle persone con disabilità. <br />
        Inserisci l’indirizzo (obbligatorio) e, se possibile, anche le coordinate 
        GPS o un link a Google Maps.
      </p>

      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-lg">
        <form ref={form} onSubmit={sendEmail} className="space-y-4">
          <div>
            <label htmlFor="indirizzo" className="block text-gray-700 font-medium">
              Indirizzo <span aria-hidden="true">*</span>
            </label>
            <input
              type="text"
              id="indirizzo"
              name="indirizzo"
              required
              aria-required="true"
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Inserisci l'indirizzo"
            />
          </div>

          <div>
            <label htmlFor="coordinate" className="block text-gray-700 font-medium">
              Coordinate (lat, lon)
            </label>
            <input
              type="text"
              id="coordinate"
              name="coordinate"
              className="w-full mt-1 p-2 border rounded-lg"
              placeholder="Es: 44.4056, 8.9463"
            />
          </div>

          <div>
            <label htmlFor="link_maps" className="block text-gray-700 font-medium">
              Link Google Maps
            </label>
            <input
              type="url"
              id="link_maps"
              name="link_maps"
              className="w-full mt-1 p-2 border rounded-lg"
              placeholder="https://maps.google.com/..."
            />
          </div>

          <div>
            <label htmlFor="note" className="block text-gray-700 font-medium">
              Note aggiuntive
            </label>
            <textarea
              id="note"
              name="note"
              rows="3"
              className="w-full mt-1 p-2 border rounded-lg"
              placeholder="Inserisci dettagli utili..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg shadow hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Invia segnalazione
          </button>
        </form>

        {/* Stato invio accessibile */}
        {statusMessage && (
          <p
            className="mt-4 text-center text-sm"
            role="status"
            aria-live="polite"
          >
            {statusMessage}
          </p>
        )}
      </div>
    </div>
  );
}
