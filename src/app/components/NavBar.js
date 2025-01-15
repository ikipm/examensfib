"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 w-full bg-white shadow z-50">
      <div className="max-w-[1500px] mx-auto px-4 py-3 flex items-center justify-between">
        <div className="font-bold text-2xl text-primary">examensfib.cat</div>
        <button
          className="md:hidden text-gray-600"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          ☰
        </button>
        <ul
          className={`${
            mobileMenuOpen ? "absolute bg-white shadow-md rounded top-12 right-4 p-4 flex flex-col gap-2" : "hidden"}
            md:flex gap-4 items-center no-list-style`}
        >
          <li>
            <Link href="/" className="text-gray-600 hover:text-primary">
              Inici
            </Link>
          </li>
          <li>
            <Link href="/#assignatures" className="text-gray-600 hover:text-primary">
              Exàmens
            </Link>
          </li>
          <li>
            <a href="#" className="text-gray-600 hover:text-primary">
              Contacte
            </a>
          </li>
          <li>
            <button className="bg-primary text-white px-4 py-2 rounded hover:bg-red-800">
              Inicia sessió
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
