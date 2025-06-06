'use client';

import Link from 'next/link';
import { useApp } from '../context/AppContext';
import { useState } from 'react';

export default function Navbar() {
  const { cart, user, logout } = useApp();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-green-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo y título */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <img 
                src="/logo.jpeg" 
                alt="Logo" 
                className="h-10 w-10 rounded-full object-cover"
              />
              <span className="text-white text-xl font-bold">
                Almaraza de Lubrín
              </span>
            </Link>
          </div>

          {/* Enlaces de navegación - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              href="/" 
              className="text-white hover:text-green-200 px-3 py-2 rounded-md font-medium transition-colors"
            >
              Inicio
            </Link>
            
            {/* Carrito */}
            <Link 
              href="/carrito" 
              className="text-white hover:text-green-200 px-3 py-2 rounded-md font-medium transition-colors relative"
            >
              <span className="flex items-center">
                🛒 Carrito
                {cartItemsCount > 0 && (
                  <span className="ml-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </span>
            </Link>

            {/* Autenticación */}
            {user ? (
              <div className="flex items-center space-x-2">
                <span className="text-white">Hola, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
                >
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link 
                  href="/login" 
                  className="text-white hover:text-green-200 px-3 py-2 rounded-md font-medium transition-colors"
                >
                  Iniciar Sesión
                </Link>
                <Link 
                  href="/registro" 
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
                >
                  Registrarse
                </Link>
              </div>
            )}
          </div>

          {/* Botón menú móvil */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-green-200 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Menú móvil */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-green-700">
              <Link 
                href="/" 
                className="text-white hover:text-green-200 block px-3 py-2 rounded-md font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link 
                href="/carrito" 
                className="text-white hover:text-green-200 block px-3 py-2 rounded-md font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                🛒 Carrito ({cartItemsCount})
              </Link>
              
              {user ? (
                <div className="space-y-1">
                  <div className="text-white px-3 py-2">Hola, {user.name}</div>
                  <button
                    onClick={handleLogout}
                    className="text-white hover:text-green-200 block px-3 py-2 rounded-md font-medium w-full text-left"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              ) : (
                <>
                  <Link 
                    href="/login" 
                    className="text-white hover:text-green-200 block px-3 py-2 rounded-md font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Iniciar Sesión
                  </Link>
                  <Link 
                    href="/registro" 
                    className="text-white hover:text-green-200 block px-3 py-2 rounded-md font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Registrarse
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 