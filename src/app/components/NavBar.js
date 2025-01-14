import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 w-full bg-white shadow z-50">
      <div className="max-w-[1200px] mx-auto flex justify-between items-center p-4">
        <div className="font-bold text-2xl text-primary">examensfib.cat</div>
        <ul className="flex gap-4 items-center no-list-style">
          <li>
            <Link
              href="/"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Inici
            </Link>
          </li>
          <li>
            <Link
              href="/#assignatures"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Exàmens
            </Link>
          </li>
          <li>
            <a
              href="#"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Contacte
            </a>
          </li>
          <li>
            <button className="bg-primary text-white px-4 py-2 rounded hover:bg-red-800 transition-colors">
              Inicia sessió
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
