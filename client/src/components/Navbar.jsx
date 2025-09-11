import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className="bg-blue-600 text-white p-4 shadow-md"
      role="navigation"
      aria-label="Menu principale"
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo + Titolo */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="/Park4Everyone.svg"
            alt="Logo Park4Everyone"
            className="h-10 w-10"
          />
          <h1 className="text-2xl font-bold">Park4Everyone</h1>
        </Link>

        {/* Menu desktop */}
        <ul className="hidden md:flex space-x-6">
          <li>
            <Link
              to="/"
              className="hover:underline focus:outline-none focus:ring-2 focus:ring-white rounded"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/segnalazioni"
              className="hover:underline focus:outline-none focus:ring-2 focus:ring-white rounded"
            >
              Segnalazioni
            </Link>
          </li>
          <li>
            <Link
              to="/contatti"
              className="hover:underline focus:outline-none focus:ring-2 focus:ring-white rounded"
            >
              Contatti
            </Link>
          </li>
        </ul>

        {/* Bottone mobile */}
        <button
          className="md:hidden focus:outline-none focus:ring-2 focus:ring-white rounded"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Apri/Chiudi menu"
          aria-expanded={isOpen}
          aria-controls="menu-mobile"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Menu mobile */}
      {isOpen && (
        <div className="md:hidden mt-4" id="menu-mobile">
          <ul className="flex flex-col space-y-2 text-center">
            <li>
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className="block py-2 hover:underline focus:outline-none focus:ring-2 focus:ring-white rounded"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/segnalazioni"
                onClick={() => setIsOpen(false)}
                className="block py-2 hover:underline focus:outline-none focus:ring-2 focus:ring-white rounded"
              >
                Segnalazioni
              </Link>
            </li>
            <li>
              <Link
                to="/contatti"
                onClick={() => setIsOpen(false)}
                className="block py-2 hover:underline focus:outline-none focus:ring-2 focus:ring-white rounded"
              >
                Contatti
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
