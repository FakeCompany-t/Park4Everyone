import { useState } from "react";
import { Menu, X } from "lucide-react"; // icone (installate con `npm i lucide-react`)

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* Logo + Titolo */}
        <div className="flex items-center space-x-2">
          <img src="/Park4Everyone.svg" alt="Park4All logo" className="h-10 w-10" />
          <h1 className="text-2xl font-bold">Park4Everyone</h1>
        </div>

        {/* Menu desktop */}
        <ul className="hidden md:flex space-x-6">
          <li><a href="#" className="hover:underline">Home</a></li>
          <li><a href="#" className="hover:underline">Chi Siamo</a></li>
          <li><a href="#" className="hover:underline">Contatti</a></li>
        </ul>

        {/* Bottone mobile */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Menu mobile */}
      {isOpen && (
        <div className="md:hidden mt-4">
          <ul className="flex flex-col space-y-2 text-center">
            <li><a href="#" className="block py-2 hover:bg-blue-700 rounded">Home</a></li>
            <li><a href="#" className="block py-2 hover:bg-blue-700 rounded">Chi Siamo</a></li>
            <li><a href="#" className="block py-2 hover:bg-blue-700 rounded">Contatti</a></li>
          </ul>
        </div>
      )}
    </nav>
  );
}
