import { Poppins } from "next/font/google";
import "./globals.css";

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
    <html lang="ca">
      <body
        className={`${poppins.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
