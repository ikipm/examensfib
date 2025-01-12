'use client';

import React, { useState } from "react";

/** 
 * Posa les teves imatges reals o placeholders.
 * Si no tens assets, pots fer servir via.placeholder.com 
 * com al codi original.
 */

function App() {
  // Per a l'acordió
  const [openAccordion, setOpenAccordion] = useState(null);

  // Per al cercador
  const [searchTerm, setSearchTerm] = useState("");

  // Exemples de llistes d'assignatures
  const fundamentals = [
    {
      img: "",
      title: "Fonaments de Matemàtiques",
      description: "Àlgebra, càlcul, equacions... tot per dominar la base matemàtica.",
    },
    {
      img: "",
      title: "Programació",
      description:
        "Resol exàmens amb diferents llenguatges: C, Java, Python...",
    },
    {
      img: "",
      title: "Estructures de Dades",
      description:
        "LListes, arbres, graf... guanya agilitat en aquesta assignatura clau.",
    },
  ];

  const optatives = [
    {
      img: "",
      title: "Intel·ligència Artificial",
      description:
        "Temaris d'IA, cerca heurística, lògica difusa, aprenentatge...",
    },
    {
      img: "",
      title: "Xarxes de Computadors",
      description:
        "Protocols, model OSI, seguretat en xarxes i exercicis pràctics.",
    },
  ];

  /** 
   * Funció per plegar/desplegar cada acordió 
   * Li passem un índex o identificador: 
   */
  const handleToggleAccordion = (id) => {
    setOpenAccordion((prev) => (prev === id ? null : id));
  };

  /** 
   * Filtre simple a partir del searchTerm
   */
  const filterSubjects = (subjects) => {
    return subjects.filter((subj) =>
      subj.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <div className="font-sans text-gray-800 bg-gray-100 min-h-screen">
      {/* Navbar */}
      <nav className="sticky top-0 w-full bg-white shadow z-50">
        <div className="max-w-[1200px] mx-auto flex justify-between items-center p-4">
          <div className="font-bold text-xl text-primary">examensfib.cat</div>
          <ul className="flex gap-4 items-center no-list-style">
            <li>
              <a
                href="#"
                className="text-gray-600 hover:text-primary transition-colors"
              >
                Inici
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-600 hover:text-primary transition-colors"
              >
                Exàmens
              </a>
            </li>
            <li>
              <a
                href="#assignatures"
                className="text-gray-600 hover:text-primary transition-colors"
              >
                Assignatures
              </a>
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

      {/* HERO */}
      <header className="hero min-h-[80vh] bg-cover bg-center bg-no-repeat flex items-center justify-center text-center text-white relative"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(255, 79, 79, 0.65), rgba(255, 145, 79, 0.65)), url('https://estatics-nasia.dtibcn.cat/nasia-pro/media/2016%2C12%2C01204146%2CEl-Campus-Nord-UPC-ciutat-universit%25C3%25A0ria.jpg')",
        }}
      >
        <div className="max-w-2xl mx-4">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Tot el que necessites<br />
            per aprovar a la FIB
          </h1>
          <p className="text-lg font-normal mb-6">
            Des de problemes de programació a exàmens antics, tot ordenat per
            temes perquè ho trobis fàcilment i estudiïs al teu ritme.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="#assignatures"
              className="bg-white text-primary px-4 py-2 rounded font-semibold hover:bg-gray-200 transition-colors"
            >
              Explora Assignatures
            </a>
            <a
              href="#com-funciona"
              className="border-2 border-white bg-transparent text-white px-4 py-2 rounded font-semibold hover:bg-white hover:text-primary transition-colors"
            >
              Com funciona?
            </a>
          </div>
        </div>
      </header>

      {/* Secció: Com funciona */}
      <section id="com-funciona" className="max-w-[1200px] mx-auto py-12 px-4">
        <h2 className="text-center text-3xl font-bold text-primary mb-10">
          Com funciona?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Pas 1 */}
          <div className="bg-white rounded shadow p-6 transition-transform hover:-translate-y-1">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-secondary text-white font-bold mb-4">
              1
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Explora o cerca assignatures
            </h3>
            <p className="text-sm text-gray-600">
              Navegant per cada assignatura pots veure exàmens històrics i problemes.
            </p>
          </div>

          {/* Pas 2 */}
          <div className="bg-white rounded shadow p-6 transition-transform hover:-translate-y-1">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-secondary text-white font-bold mb-4">
              2
            </div>
            <h3 className="text-xl font-semibold mb-2">Selecciona el tema</h3>
            <p className="text-sm text-gray-600">
              Les assignatures es divideixen en temes o unitats per a trobar més ràpid
              el contingut que busques.
            </p>
          </div>

          {/* Pas 3 */}
          <div className="bg-white rounded shadow p-6 transition-transform hover:-translate-y-1">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-secondary text-white font-bold mb-4">
              3
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Resol els exercicis
            </h3>
            <p className="text-sm text-gray-600">
              Resol els exercicis amb les respostes al mateix lloc. Si no t'ensurts,
              envia l'enllaç del problema a un company, així de fàcil.
            </p>
          </div>
        </div>
      </section>

      {/* Secció Assignatures */}
      <main id="assignatures" className="max-w-[1200px] mx-auto py-12 px-4">
        <h2 className="text-center text-3xl font-bold text-primary mb-8">
          Assignatures destacades
        </h2>

        {/* Bar de filtre */}
        <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
          <div className="flex border border-gray-300 rounded overflow-hidden max-w-sm w-full">
            <input
              type="text"
              placeholder="Cerca una assignatura..."
              className="flex-grow p-2 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="bg-primary text-white px-4">
              Cerca
            </button>
          </div>
        </div>

        {/* Acordió: Primer curs */}
        <div
          className={`accordion-item mb-4 rounded shadow bg-white overflow-hidden ${
            openAccordion === 1 ? "active" : ""
          }`}
        >
          <div
            className="accordion-header cursor-pointer px-4 py-2 flex justify-between items-center bg-secondary text-white"
            onClick={() => handleToggleAccordion(1)}
          >
            <h3 className="text-lg font-semibold">Primer curs</h3>
            <span className="accordion-icon font-bold transition-transform">
              ›
            </span>
          </div>
          <div className="accordion-body px-4 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-2">
              {filterSubjects(fundamentals).map((item, idx) => (
                <div
                  className="subject-item flex bg-white rounded shadow hover:-translate-y-1 transition-transform"
                  key={idx}
                >
                  <img
                    src={item.img}
                    alt="icona"
                    className="w-20 h-20 object-cover m-4 rounded-full"
                  />
                  <div className="p-4 flex-1">
                    <h4 className="card-title text-lg font-semibold mb-2 text-gray-800">
                      {item.title}
                    </h4>
                    <p className="card-description text-sm text-gray-600 mb-2">
                      {item.description}
                    </p>
                    <a
                      href="#"
                      className="card-link text-primary font-semibold hover:underline"
                    >
                      Veure exàmens
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Acordió: Optatives */}
        <div
          className={`accordion-item mb-4 rounded shadow bg-white overflow-hidden ${
            openAccordion === 2 ? "active" : ""
          }`}
        >
          <div
            className="accordion-header cursor-pointer px-4 py-2 flex justify-between items-center bg-secondary text-white"
            onClick={() => handleToggleAccordion(2)}
          >
            <h3 className="text-lg font-semibold">Optatives</h3>
            <span className="accordion-icon font-bold transition-transform">
              ›
            </span>
          </div>
          <div className="accordion-body px-4 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-2">
              {filterSubjects(optatives).map((item, idx) => (
                <div
                  className="subject-item flex bg-white rounded shadow hover:-translate-y-1 transition-transform"
                  key={idx}
                >
                  <img
                    src={item.img}
                    alt="icona"
                    className="w-20 h-20 object-cover m-4 rounded-full"
                  />
                  <div className="p-4 flex-1">
                    <h4 className="card-title text-lg font-semibold mb-2 text-gray-800">
                      {item.title}
                    </h4>
                    <p className="card-description text-sm text-gray-600 mb-2">
                      {item.description}
                    </p>
                    <a
                      href="#"
                      className="card-link text-primary font-semibold hover:underline"
                    >
                      Veure exàmens
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* CTA final */}
      <section className="bg-primary text-white text-center py-12">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Uneix-te a la comunitat d'estudiants de la FIB
          </h2>
          <p className="mb-6">
            Aprofita tots els recursos que ofereix examensfib.cat per millorar
            les teves qualificacions i excel·lir en els teus estudis.
          </p>
          <a
            href="#"
            className="bg-white text-primary px-6 py-3 rounded font-semibold hover:bg-gray-200 transition-colors"
          >
            Registra't ara
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="max-w-[1200px] mx-auto text-center text-gray-600">
          <p className="mb-4">
            &copy; 2025 examensfib.cat. Tots els drets reservats.
          </p>
          <ul className="flex justify-center gap-6 no-list-style text-sm">
            <li>
              <a href="#" className="hover:text-primary">
                Política de privacitat
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary">
                Termes i condicions
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary">
                Contacte
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default App;
