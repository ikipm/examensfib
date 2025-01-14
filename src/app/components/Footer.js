export default function Footer() {
  return (
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
  );
}
