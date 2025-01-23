"use client";

import { useState, useEffect } from "react";

export default function Add() {
  const [isOpen, setIsOpen] = useState(
    () => Math.floor(Math.random() * 3) === 2
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white rounded-md shadow-xl p-6 max-w-lg w-full mx-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Eip! Un dels nostres anunciants té alguna cosa a dir-te FIBer!
        </h2>
        <img
          src="https://gennews.upc.edu/fib-pdipas/media/images/mautic7/FIB/llibre-Python-deep-learning-bar-fib.jpg"
          alt="Advertisement"
          className="w-full h-auto object-contain rounded-md mb-4"
        />
        <p className="text-gray-600 mb-6">
          Vine a probar el superpitifli de la FIB! 🍔🍟
        </p>
        <button
          onClick={() => setIsOpen(false)}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none"
        >
          Close
        </button>
      </div>
    </div>
  );
}
