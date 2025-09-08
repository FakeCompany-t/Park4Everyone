import { useRef } from "react";
import emailjs from "emailjs-com";

export default function Segnalazioni() {
  const form = useRef();

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
          alert("✅ Segnalazione inviata con successo!");
          form.current.reset();
        },
        (error) => {
          console.error(error.text);
          alert("❌ Errore nell'invio della segnalazione.");
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
            <label className="block text-gray-700 font-medium">Indirizzo *</label>
            <input
              type="text"
              name="indirizzo"
              required
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Inserisci l'indirizzo"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Coordinate (lat, lon)</label>
            <input
              type="text"
              name="coordinate"
              className="w-full mt-1 p-2 border rounded-lg"
              placeholder="Es: 44.4056, 8.9463"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Link Google Maps</label>
            <input
              type="url"
              name="link_maps"
              className="w-full mt-1 p-2 border rounded-lg"
              placeholder="https://maps.google.com/..."
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Note aggiuntive</label>
            <textarea
              name="note"
              rows="3"
              className="w-full mt-1 p-2 border rounded-lg"
              placeholder="Inserisci dettagli utili..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg shadow hover:bg-blue-700 transition"
          >
            Invia segnalazione
          </button>
        </form>
      </div>
    </div>
  );
}
