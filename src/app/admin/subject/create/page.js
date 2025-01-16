"use client";

import React, { useState } from "react";

export default function CreateSubjectPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [color, setColor] = useState("#b32d2d");
  const [course, setCourse] = useState("1");
  const [icon, setIcon] = useState(null);
  const [contents, setContents] = useState([{ title: "", description: "" }]);
  const [disabled, setDisabled] = useState(false);

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
    // Submit logic here
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("url", url.toLowerCase());
    formData.append("color", color);
    formData.append("course", course);
    if (icon) formData.append("icon", icon);
    formData.append("contents", JSON.stringify(contents));

    /*console.log({
      name,
      description,
      url,
      color,
      course,
      icon,
      contents,
    });*/

    try {
      const response = await fetch("/api/admin/subjects/create", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to create subject");
      }

      if (response.status === 200) {
        // Redirect to the new subject page
        const data = await response.json();
        window.location.href = `/subject/${data.url}`;
      } else {setDisabled(true);}

      // Optionally handle the response, e.g., redirect or display a success message
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
            Crea una nova assignatura
          </h2>
          <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
            {/* Subject Fields */}
            <div className="space-y-5">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
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
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
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
                <label
                  htmlFor="url"
                  className="block text-sm font-medium text-gray-700"
                >
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
                <label
                  htmlFor="color"
                  className="block text-sm font-medium text-gray-700"
                >
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
                <label
                  htmlFor="course"
                  className="block text-sm font-medium text-gray-700"
                >
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
                <label
                  htmlFor="icon"
                  className="block text-sm font-medium text-gray-700"
                >
                  Icona
                </label>
                <input
                  id="icon"
                  name="icon"
                  type="file"
                  accept="image/*"
                  onChange={handleIconChange}
                  required
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
                          handleContentChange(
                            index,
                            "description",
                            e.target.value
                          )
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
                Crea l'assignatura
              </button>
            </div>
          </form>
        </div>

        {/* Simulation Panel */}
        <div className="flex-1 bg-white rounded-lg shadow overflow-hidden">
          {/* Header Simulation */}
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

          {/* Main Content Simulation */}
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
