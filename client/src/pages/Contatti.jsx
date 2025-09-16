export default function Contatti() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-700">
        Contatti
      </h2>

      <div className="bg-white p-8 rounded-xl shadow-md space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-blue-600">Indirizzo</h3>
          <p>Via Esempio 123, 16100 Genova, Italia</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2 text-blue-600">Telefono</h3>
          <p>+39 010 1234567</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2 text-blue-600">Email</h3>
          <p>
            <a href="mailto:info@park4everyone.it" className="text-blue-600 underline">
              info@park4everyone.it
            </a>
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2 text-blue-600">Modulo di contatto</h3>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Nome"
              className="w-full border border-gray-300 rounded-lg p-2"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-gray-300 rounded-lg p-2"
            />
            <textarea
              placeholder="Messaggio"
              rows={4}
              className="w-full border border-gray-300 rounded-lg p-2"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Invia
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
