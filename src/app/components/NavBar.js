"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session, status } = useSession();

  return (
    <nav className="sticky top-0 w-full bg-white shadow z-50">
      <div className="max-w-[1500px] mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/">
          <div className="font-bold text-2xl text-primary">examensfib.cat</div>
        </Link>
        <button
          className="md:hidden text-gray-600"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          ☰
        </button>
        <ul
          className={`${
            mobileMenuOpen
              ? "absolute bg-white shadow-md rounded top-12 right-4 p-4 flex flex-col gap-2"
              : "hidden"
          } md:flex gap-4 items-center no-list-style`}
        >
          <li>
            <Link href="/" className="text-gray-600 hover:text-primary">
              Inici
            </Link>
          </li>
          <li>
            <Link
              href="/#assignatures"
              className="text-gray-600 hover:text-primary"
            >
              Exàmens
            </Link>
          </li>
          <li>
            <a href="#" className="text-gray-600 hover:text-primary">
              Contacte
            </a>
          </li>

          {/* Conditionally render based on session */}
          {session ? (
            <>
              <li>
                {/* Display username or any user info here */}
                <span className="text-gray-600">
                  Benvingut, {session.user.name}
                </span>
              </li>
              <li>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="bg-red-600 text-white px-4 py-2 rounded"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link
                href="/auth/signin"
                className="bg-primary text-white px-4 py-2 rounded hover:bg-red-800"
              >
                Inicia sessió
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
