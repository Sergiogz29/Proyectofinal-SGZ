import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProvider } from "../context/AppContext";
import Navbar from "../components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Almaraza de Lubrín - Aceites de Oliva",
  description: "Tienda de aceites de oliva premium de la mejor calidad",
  icons: {
    icon: [
      { url: '/olive-oil.png', type: 'image/png' },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppProvider>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
        </AppProvider>
      </body>
    </html>
  );
}
