"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function EditSubjectPage() {
  const { subject } = useParams(); // Assumes the route includes an 'subject' parameter
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [color, setColor] = useState("#b32d2d");
  const [course, setCourse] = useState("1");
  const [icon, setIcon] = useState(null);
  const [contents, setContents] = useState([{ title: "", description: "" }]);
  const [disabled, setDisabled] = useState(false);
  const [subjectElement, setSubjectElement] = useState(null);
  const [error, setError] = useState(null);

  // Fetch existing subject data on mount
  useEffect(() => {
    async function fetchSubject() {
      try {
        const response = await fetch(`/api/subjects/${subject}`);
        if (!response.ok) {
          throw new Error("Failed to fetch subject data");
        }
        const json = await response.json();
        const data = json.subject;
        setName(data.name || "");
        setDescription(data.description || "");
        setUrl(data.url || "");
        setColor(data.color || "#b32d2d");
        setCourse(data.course || "1");
        setContents(data.contents?.length ? data.contents : [{ title: "", description: "" }]);
        setSubjectElement(data);
      } catch (error) {
        setError(`Error al carregar l'assignatura: ${err.message}`);
        console.error("Error fetching subject:", error);
      }
    }

    fetchSubject();
  }, [subject]);

  if (error) {
    return (
      <div className="text-center text-red-600 py-10">
        <p>{error}</p>
      </div>
    );
  }

  if (!subjectElement) {
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

  const handleIconChange = (e) => setIcon(e.target.files[0]);
  const handleContentChange = (index, field, value) => {
    const updatedContents = [...contents];
    updatedContents[index][field] = value;
    setContents(updatedContents);
  };
  const addContent = () =>
    setContents([...contents, { title: "", description: "" }]);
  const removeContent = (index) =>
    setContents(contents.filter((_, i) => i !== index));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("url", url.toLowerCase());
    formData.append("color", color);
    formData.append("course", course);
    if (icon) formData.append("icon", icon);
    formData.append("contents", JSON.stringify(contents));

    try {
      // Assuming an update endpoint that uses PUT or POST for updates
      const response = await fetch(`/api/admin/subjects/edit/`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to update subject");
      }

      if (response.status === 200) {
        const data = await response.json();
        window.location.href = `/subject/${data.url}`;
      } else {
        setDisabled(true);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-start py-12 px-4">
      <div className="flex flex-col lg:flex-row gap-8 w-full max-w-6xl mx-auto">
        {/* Form Panel */}
        <div className="flex-1 space-y-8 bg-white p-12 rounded-lg shadow">
          <h2 className="text-center text-2xl font-semibold text-gray-800">
            Edita l'assignatura
          </h2>
          <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
            {/* Subject Fields */}
            <div className="space-y-5">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nom
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md 
                             placeholder-gray-500 text-gray-900 focus:outline-none 
                             focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Nom de l'assignatura"
                />
              </div>
              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Descripció
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="3"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md 
                             placeholder-gray-500 text-gray-900 focus:outline-none 
                             focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Descripció de l'assignatura"
                />
              </div>
              {/* URL */}
              <div>
                <label htmlFor="url" className="block text-sm font-medium text-gray-700">
                  Acrònim
                </label>
                <input
                  id="url"
                  name="url"
                  type="text"
                  required
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md 
                             placeholder-gray-500 text-gray-900 focus:outline-none 
                             focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Acrònim"
                />
              </div>
              {/* Color */}
              <div>
                <label htmlFor="color" className="block text-sm font-medium text-gray-700">
                  Color
                </label>
                <input
                  id="color"
                  name="color"
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="mt-1 w-12 h-10 p-0 border-none bg-transparent cursor-pointer"
                />
              </div>
              {/* Course */}
              <div>
                <label htmlFor="course" className="block text-sm font-medium text-gray-700">
                  Curs
                </label>
                <select
                  id="course"
                  name="course"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md 
                             bg-white text-gray-900 focus:outline-none focus:ring-1 
                             focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="1">Primer</option>
                  <option value="2">Segon</option>
                  <option value="3">Tercer</option>
                  <option value="4">Quart</option>
                </select>
              </div>
              {/* Icon */}
              <div>
                <label htmlFor="icon" className="block text-sm font-medium text-gray-700">
                  Icona
                </label>
                <input
                  id="icon"
                  name="icon"
                  type="file"
                  accept="image/*"
                  onChange={handleIconChange}
                  className="mt-1 block w-full text-sm text-gray-900
                             file:mr-3 file:py-2 file:px-4
                             file:rounded-md file:border-0
                             file:text-sm file:font-medium
                             file:bg-gray-100 file:text-gray-700
                             hover:file:bg-gray-200"
                />
              </div>
            </div>

            {/* Dynamic Contents */}
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                Continguts
              </h3>
              {contents.map((content, index) => (
                <div
                  key={index}
                  className="mb-4 p-4 border border-gray-200 rounded-md relative"
                >
                  {contents.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeContent(index)}
                      className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-xl"
                    >
                      &times;
                    </button>
                  )}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Títol
                      </label>
                      <input
                        type="text"
                        value={content.title}
                        onChange={(e) =>
                          handleContentChange(index, "title", e.target.value)
                        }
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md 
                                   placeholder-gray-500 text-gray-900 focus:outline-none 
                                   focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Títol del temari"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Descripció
                      </label>
                      <textarea
                        value={content.description}
                        onChange={(e) =>
                          handleContentChange(index, "description", e.target.value)
                        }
                        rows="2"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md 
                                   placeholder-gray-500 text-gray-900 focus:outline-none 
                                   focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Descripció del temari"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button
                type="button"
                className="text-white bg-primary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2"
                onClick={addContent}
              >
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 5v14m-7-7h14"
                  />
                </svg>
                <span className="sr-only">Add content</span>
              </button>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={disabled}
                className="w-full flex justify-center py-2 px-4 border border-transparent 
                           text-sm font-medium rounded-md text-white bg-primary 
                           focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
                           disabled:bg-gray-400"
              >
                Actualitza l'assignatura
              </button>
            </div>
          </form>
        </div>

        {/* Simulation Panel remains unchanged */}
        <div className="flex-1 bg-white rounded-lg shadow overflow-hidden">
          <header
            className="text-white py-8"
            style={{ background: `${color}` }}
          >
            <div className="max-w-4xl mx-auto text-center px-4">
              <h1 className="text-4xl md:text-4xl font-extrabold mb-4 tracking-tight">
                {name || "Nom de l'assignatura"}
              </h1>
              <span
                className="inline-block bg-white px-4 py-1 rounded-full font-semibold mb-4"
                style={{ color: `${color}` }}
              >
                {url ? url.toUpperCase() : "ACRÒNIM"}
              </span>
              <p className="text-lg font-normal">
                {description || "Descripció de l'assignatura"}
              </p>
            </div>
          </header>

          <main className="max-w-4xl mx-auto py-12 px-4">
            <h2
              className="text-2xl font-bold text-gray-800 mb-6"
              style={{ color: `${color}` }}
            >
              Contingut
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {contents.length > 0 ? (
                contents.map((content, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 border border-gray-200 rounded shadow p-4 
                               hover:-translate-y-1 transition-transform"
                  >
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {content.title || "Títol del temari"}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {content.description || "Descriptió del temari"}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No hi ha contingut</p>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
