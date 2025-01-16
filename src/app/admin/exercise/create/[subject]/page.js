"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function CreateExercisePage() {
  const router = useRouter();
  const params = useParams();
  const subjectSlug = params.subject;

  const [subject, setSubject] = useState(null);
  const [year, setYear] = useState(new Date().getFullYear());
  const [quarter, setQuarter] = useState("1");
  const [contentId, setContentId] = useState("");
  const [exerciseImage, setExerciseImage] = useState(null);
  const [solutionImage, setSolutionImage] = useState(null);
  const [solutionsVisible, setSolutionsVisible] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (subjectSlug) {
      fetch(`/api/subjects/${subjectSlug}`)
        .then((res) => res.json())
        .then((data) => setSubject(data.subject))
        .catch((err) => console.error(err));
    }
  }, [subjectSlug]);

  useEffect(() => {
    if (subject && subject.contents && subject.contents.length > 0 && !contentId) {
      setContentId(subject.contents[0]._id);
    }
  }, [subject, contentId]);

  const handleExerciseImageChange = (e) => {
    setExerciseImage(e.target.files[0]);
  };

  const handleSolutionImageChange = (e) => {
    setSolutionImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("year", year);
    formData.append("quarter", quarter);
    formData.append("content", contentId);
    formData.append("subject", subject?._id || "");
    formData.append("exerciseImage", exerciseImage);
    formData.append("solutionImage", solutionImage);

    try {
      const response = await fetch(`/api/exercises/create`, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Failed to create exercise");
      const data = await response.json();
      router.push(`/subject/${subjectSlug}/${data.contentId}/${data.exerciseId}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex items-start py-12 px-4">
      <div className="flex flex-col lg:flex-row gap-8 w-full max-w-6xl mx-auto">
        {/* Panell del formulari */}
        <div className="flex-1 space-y-8 bg-white p-12 rounded-lg shadow">
          <h2 className="text-center text-2xl font-semibold text-gray-800">
            Crea un nou exercici
          </h2>
          <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-5">
              {/* Any */}
              <div>
                <label htmlFor="year" className="block text-sm font-medium text-gray-700">
                  Any
                </label>
                <input
                  id="year"
                  name="year"
                  type="number"
                  required
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              {/* Quatrimestre */}
              <div>
                <label htmlFor="quarter" className="block text-sm font-medium text-gray-700">
                  Quatrimestre
                </label>
                <select
                  id="quarter"
                  name="quarter"
                  value={quarter}
                  onChange={(e) => setQuarter(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="1">Primer</option>
                  <option value="2">Segon</option>
                </select>
              </div>
              {/* Títol del temari (dropdown) */}
              <div>
                <label htmlFor="contentTitle" className="block text-sm font-medium text-gray-700">
                  Títol del temari
                </label>
                {subject && subject.contents && subject.contents.length > 0 ? (
                  <select
                    id="contentTitle"
                    name="contentTitle"
                    required
                    value={contentId}
                    onChange={(e) => setContentId(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    {subject.contents.map((content) => (
                      <option key={content._id} value={content._id}>
                        {content.title}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p className="text-gray-500">No hi ha continguts disponibles.</p>
                )}
              </div>
              {/* Imatge de l'exercici */}
              <div>
                <label htmlFor="exerciseImage" className="block text-sm font-medium text-gray-700">
                  Imatge de l'exercici
                </label>
                <input
                  id="exerciseImage"
                  name="exerciseImage"
                  type="file"
                  accept="image/*"
                  required
                  onChange={handleExerciseImageChange}
                  className="mt-1 block w-full text-sm text-gray-900"
                />
              </div>
              {/* Imatge de la solució */}
              <div>
                <label htmlFor="solutionImage" className="block text-sm font-medium text-gray-700">
                  Imatge de la solució
                </label>
                <input
                  id="solutionImage"
                  name="solutionImage"
                  type="file"
                  accept="image/*"
                  required
                  onChange={handleSolutionImageChange}
                  className="mt-1 block w-full text-sm text-gray-900"
                />
              </div>
            </div>

            {/* Botó d'enviament */}
            <div>
              <button
                type="submit"
                disabled={disabled}
                className="w-full flex justify-center py-2 px-4 border border-transparent 
                           text-sm font-medium rounded-md text-white bg-primary 
                           focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 
                           disabled:bg-gray-400"
              >
                Crea l'exercici
              </button>
            </div>
          </form>
        </div>

        {/* Panell de simulació */}
        <div className="flex-1 bg-white rounded-lg shadow overflow-hidden">
          {/* Simulació del capçal */}
          <header
            className="text-white py-8"
            style={{ backgroundColor: subject ? subject.color : "#b32d2d" }}
          >
            <div className="max-w-4xl mx-auto text-center px-4">
              <h1 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight">
                {subject ? subject.name : "Nom de l'assignatura"}
              </h1>
              <span
                className="inline-block bg-white px-4 py-1 rounded-full text-sm font-semibold"
                style={{ color: subject ? subject.color : "#b32d2d" }}
              >
                {subject ? subject.url.toUpperCase() : "ACRÒNIM"}
              </span>
            </div>
          </header>

          {/* Simulació del contingut principal */}
          <main className="max-w-5xl mx-auto py-12 px-4">
            <div className="flex flex-col md:flex-row items-center gap-12">
              {/* Vista prèvia de la imatge de l'exercici */}
              <div className="md:w-2/3 w-full">
                {exerciseImage ? (
                  <img
                    src={URL.createObjectURL(exerciseImage)}
                    alt="Vista prèvia de l'exercici"
                    className="w-full h-auto rounded-lg shadow-md"
                    draggable="false"
                  />
                ) : (
                  <div className="w-full h-64 bg-gray-200 rounded-md flex items-center justify-center">
                    <span className="text-gray-500">Vista prèvia de l'exercici</span>
                  </div>
                )}
              </div>

              {/* Targeta d'informació */}
              <div className="md:w-1/3 w-full">
                <div className="bg-white bg-opacity-75 backdrop-blur-sm shadow-md rounded-lg p-6">
                  <div className="space-y-6">
                    <div>
                      <p className="text-sm text-gray-500 uppercase font-semibold mb-1">
                        Any - Quatrimestre
                      </p>
                      <p className="text-lg font-medium text-gray-700">
                        {year} - Q{quarter}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 uppercase font-semibold mb-1">
                        Temari
                      </p>
                      <p className="text-lg font-medium text-gray-700">
                        {subject && subject.contents && subject.contents.find(c => c._id === contentId)?.title || "Títol del temari"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Vista prèvia de la solució */}
            <div className="text-center mt-16">
              {solutionsVisible && solutionImage && (
                <div className="flex justify-center transition-opacity duration-500 ease-in-out">
                  <img
                    src={URL.createObjectURL(solutionImage)}
                    alt="Vista prèvia de la solució"
                    className="w-full max-w-xl rounded-lg shadow-md"
                    draggable="false"
                  />
                </div>
              )}
            </div>

            {/* Botó per mostrar/ocultar solucions */}
            {solutionImage && (
              <div className="text-center mt-4">
                <button
                  type="button"
                  onClick={() => setSolutionsVisible(!solutionsVisible)}
                  style={{ backgroundColor: subject ? subject.color : "#b32d2d" }}
                  className="text-white
                             focus:ring-4 focus:outline-none focus:ring-red-300 
                             font-medium rounded-lg text-sm py-2 px-4"
                >
                  {solutionsVisible ? "Amaga les solucions" : "Mostra les solucions"}
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
