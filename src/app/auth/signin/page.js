"use client";

import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";

export default function SignInForm() {
  const router = useRouter();
  const { data: session, status } = useSession();
  if (status === "authenticated") {
    router.push("/");
  }
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result.error) {
      // Handle error (e.g., show a message to the user)
      console.error(result.error);
    } else {
      // If has no previous page, redirect to the home page
      if (router.asPath === "/auth/signin") {
        router.push("/");
      } else {
        router.back();
      }
    }
  };

  return (
    <div className="mt-10 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg max-w-md w-full px-8 py-10">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Inicia sessió
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Insereix el teu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-red-800 focus:border-red-800 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Contrasenya
            </label>
            <input
              type="password"
              id="password"
              placeholder="Insereix la teva contrasenya"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-red-800 focus:border-red-800 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-800"
          >
            Inicia sessió
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Encara no has entrat?{" "}
          <Link href="/auth/signup" className="font-medium text-primary">
            Crea un compte
          </Link>
        </p>
      </div>
    </div>
  );
}
