import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import Add from "./components/Add";

// Import Poppins font
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"], // You can add more subsets if needed
  weight: ["400", "600", "700"], // Specify font weights you plan to use
});

export const metadata = {
  title: "ExamensFIB",
  description: "Tots els exàmens de la FIB en un sol lloc",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ca" className="h-full">
      <body className={`${poppins.variable} antialiased h-full flex flex-col bg-gray-100`}>
        {/* Navbar */}
        <Navbar />

        {/* Main content */}
        <main className="flex-grow">{children}</main>
        <Add />

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
