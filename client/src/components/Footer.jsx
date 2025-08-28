export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-200 py-6 mt-auto">
      <div className="container mx-auto text-center">
        <h2 className="text-lg font-semibold">Park4All</h2>
        <p className="text-sm mt-2">
          Mappa interattiva dei parcheggi per disabili a Genova. Progetto pensato per migliorare l'accessibilità urbana.
        </p>
        <p className="text-xs mt-4">
          © {new Date().getFullYear()} Park4All. Tutti i diritti riservati.
        </p>
      </div>
    </footer>
  );
}
