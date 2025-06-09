'use client';

import { useState } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';                     // ← importa js-cookie
import { useApp } from '../context/AppContext';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart, user, logout } = useApp();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    Cookies.remove('token');                         // 1️⃣ elimina la cookie al cerrar sesión
    logout();                                        // 2️⃣ limpia contexto
  };

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center h-16">
        <Link href="/" className="text-xl font-bold text-green-600">
          Almaraza de Lubrín
        </Link>

        <div className="hidden md:flex space-x-6 items-center">
          <Link href="/" className="hover:text-green-600">Inicio</Link>
          {user && (
            <Link href="/productos" className="hover:text-green-600">Productos</Link>
          )}
          <Link href="/carrito" className="relative hover:text-green-600">
            Carrito
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-600 text-white rounded-full px-1 text-xs">
                {totalItems}
              </span>
            )}
          </Link>
          {user ? (
            <>
              <span>Hola, {user.name}</span>
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-800"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-green-600">Login</Link>
              <Link href="/registro" className="hover:text-green-600">Registro</Link>
            </>
          )}
        </div>

        <button
          className="md:hidden p-2 rounded hover:bg-gray-100"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white px-4 pb-4 space-y-2">
          <Link href="/" className="block hover:text-green-600">Inicio</Link>
          {user && (
            <Link href="/productos" className="block hover:text-green-600">Productos</Link>
          )}
          <Link href="/carrito" className="block hover:text-green-600">
            Carrito ({totalItems})
          </Link>
          {user ? (
            <>
              <span className="block">Hola, {user.name}</span>
              <button
                onClick={handleLogout}
                className="block text-red-600 hover:text-red-800"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="block hover:text-green-600">Login</Link>
              <Link href="/registro" className="block hover:text-green-600">Registro</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
