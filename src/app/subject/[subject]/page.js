"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import AdminMenu from "@/app/components/AdminMenu";

function SubjectPage() {
  const [subject, setSubject] = useState(null);
  const [error, setError] = useState(null);

  const params = useParams();
  const subjectUrl = params?.subject;

  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const res = await fetch(`/api/subjects/${subjectUrl}`);
        const data = await res.json();
        const fetchedSubject = data.subject;
        setSubject(fetchedSubject);
      } catch (err) {
        setError(`Error al carregar l'assignatura: ${err.message}`);
        console.error(err);
      }
    };

    fetchSubject();
  }, [subjectUrl]);

  if (error) {
    return (
      <div className="text-center text-red-600 py-10">
        <p>{error}</p>
      </div>
    );
  }

  if (!subject) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-100">
        <div role="status">
          <svg
            aria-hidden="true"
            className="inline w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-red-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="font-sans text-gray-800 bg-gray-100">
      {/* Header */}
      <header className="text-white py-8" style={{ backgroundColor: subject.color || "#b32d2d" }}>
        <div className="max-w-4xl mx-auto text-center px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            {subject.name}
          </h1>
          <span className="inline-block bg-white px-4 py-1 rounded-full font-semibold mb-4" style={{ color: subject.color || "#b32d2d" }}>
            {subject.url.toUpperCase()}
          </span>
          <p className="text-lg font-normal">{subject.description}</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1200px] mx-auto py-12 px-4">
        <h2 className="text-2xl font-bold text-primary mb-6">Contingut</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {subject.contents && subject.contents.length > 0 ? (
            subject.contents.map((content) => {
                // Filter exercises that match the current content ID
                const matchingExercises = subject.exercises.filter(
                (exercise) => exercise.content === content._id
                );
        
                if (matchingExercises.length > 0) {
                // Sort them by createdAt in descending order to get the latest first
                const latestExercise = matchingExercises.sort(
                  (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                )[0];
        
                const exerciseId = latestExercise._id;
        
                return (
                  <Link
                  key={content._id}
                  href={`/subject/${subject.url}/${exerciseId}`}
                  className="content-item"
                  >
                  <div className="bg-white rounded shadow hover:-translate-y-1 transition-transform p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {content.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                    {content.description || "No hi ha descripció disponible."}
                    </p>
                  </div>
                  </Link>
                );
                } else {
                return (
                  <div
                  key={content._id}
                  className="content-item bg-gray-200 rounded p-4 cursor-not-allowed opacity-50"
                  >
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {content.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {content.description || "No hi ha descripció disponible."}
                  </p>
                  </div>
                );
                }
            })
          ) : (
            <p className="text-gray-500">
              No hi ha contingut disponible per a aquesta assignatura.
            </p>
          )}
        </div>
      </main>
      <AdminMenu mainButtonColor={subject.color} subjectUrl={subject.url} />
    </div>
  );
}

export default SubjectPage;
