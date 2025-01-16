"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import AdminMenu from "@/app/components/AdminMenu";

function ExercisePage() {
  const [exercise, setExercise] = useState(null);
  const [error, setError] = useState(null);
  const [solutionsVisible, setSolutionsVisible] = useState(false);
  const [sortedExercises, setSortedExercises] = useState([]);
  const [previousId, setPreviousId] = useState(null);
  const [nextId, setNextId] = useState(null);

  const params = useParams();
  const { subject, contentId, exerciseId } = params;
  const router = useRouter();

  useEffect(() => {
    const fetchExerciseData = async () => {
      try {
        const res = await fetch(`/api/subjects/${subject}`);
        const data = await res.json();

        const allExercises = data.subject.exercises.filter(
          (ex) => ex.content === contentId
        );

        const sorted = allExercises.sort((a, b) => {
          if (b.year !== a.year) return b.year - a.year;
          return b.quarter - a.quarter;
        });

        setSortedExercises(sorted);

        const currentIndex = sorted.findIndex((ex) => ex._id === exerciseId);
        setPreviousId(currentIndex > 0 ? sorted[currentIndex - 1]._id : null);
        setNextId(
          currentIndex < sorted.length - 1 ? sorted[currentIndex + 1]._id : null
        );

        // Fetch the current exercise details
        const exerciseRes = await fetch(`/api/exercises/${exerciseId}`);
        const exerciseData = await exerciseRes.json();
        setExercise(exerciseData.exercise);
      } catch (err) {
        setError(`Error fetching exercise: ${err.message}`);
        console.error(err);
      }
    };

    fetchExerciseData();
  }, [subject, contentId, exerciseId]);

  const handlePrevious = () => {
    if (exercise && exercise.previousId) {
      router.push(`/${subject}/${exercise.previousId}`);
    }
  };

  const handleNext = () => {
    if (exercise && exercise.nextId) {
      router.push(`/${subject}/${exercise.nextId}`);
    }
  };

  if (error) {
    return (
      <div className="flex items-center justify-center bg-red-50">
        <div className="text-center text-red-700 bg-red-100 p-6 rounded shadow">
          {error}
        </div>
      </div>
    );
  }

  if (!exercise) {
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
    <div className="flex flex-col font-sans bg-gray-100 text-gray-800">
      {/* Header */}
      <header
        className="text-white py-8"
        style={{ backgroundColor: exercise.subject.color || "#b32d2d" }}
      >
        <div className="max-w-4xl mx-auto text-center px-4">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight">
            {exercise.subject.name}
          </h1>
          <span
            className="inline-block bg-white px-4 py-1 rounded-full text-sm font-semibold"
            style={{ color: exercise.subject.color || "#b32d2d" }}
          >
            {exercise.subject.url.toUpperCase()}
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <section className="max-w-5xl mx-auto px-1 py-12">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Image Display */}
            <div className="md:w-2/3 w-full">
              <img
                src={`/img/${exercise.subject.url}/exercise/${exerciseId}.png`}
                alt="Exercise"
                className="w-full h-auto rounded-lg shadow-md"
                draggable="false"
              />
            </div>

            {/* Information Card */}
            <div className="md:w-1/3 w-full">
              <div className="bg-white bg-opacity-75 backdrop-blur-sm shadow-md rounded-lg p-6">
                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-gray-500 uppercase font-semibold mb-1">
                      Any - Quatrimestre
                    </p>
                    <p className="text-lg font-medium text-gray-700">
                      {exercise.year} - Q{exercise.quarter}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 uppercase font-semibold mb-1">
                      Temari
                    </p>
                    <p className="text-lg font-medium text-gray-700">
                      {exercise.content.title}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Solutions Toggle */}
          <div className="text-center mt-16">
            {solutionsVisible && (
              <div className="flex justify-center transition-opacity duration-500 ease-in-out ">
                <img
                  src={`/img/${exercise.subject.url}/answer/${exerciseId}.png`}
                  alt="Solution"
                  className="w-full max-w-2xl rounded-lg shadow-md"
                  draggable="false"
                />
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <nav className="mt-8 flex justify-center space-x-4">
            {/* Previous Button */}
            {previousId && (
              <Link
                href={`/subject/${subject}/${contentId}/${previousId}`}
                onClick={handlePrevious}
                style={{ backgroundColor: exercise.subject.color || "#b32d2d" }}
                className="flex items-center text-white
                          focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg 
                          text-sm py-3 px-6"
              >
                <svg
                  className="w-5 h-5 transform rotate-180 mr-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
                Anterior
              </Link>
            )}

            {/* Middle Button */}
            <button
              type="button"
              onClick={() => setSolutionsVisible(!solutionsVisible)}
              style={{ backgroundColor: exercise.subject.color || "#b32d2d" }}
              className="flex items-center text-white
                         focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg 
                         text-sm py-3 px-6"
            >
              {solutionsVisible
                ? "Amaga les solucions"
                : "Mostra les solucions"}
              {solutionsVisible}
            </button>

            {/* Next Button */}
            {nextId && (
              <Link
                href={`/subject/${subject}/${contentId}/${nextId}`}
                onClick={handleNext}
                style={{ backgroundColor: exercise.subject.color || "#b32d2d" }}
                className="flex items-center text-white
                          focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg 
                          text-sm py-3 px-6"
              >
                Següent
                <svg
                  className="w-5 h-5 ml-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </Link>
            )}
          </nav>
        </section>
      </main>
      <AdminMenu subjectUrl={subject} exerciseId={exerciseId} />
    </div>
  );
}

export default ExercisePage;
