'use client';
import { useEffect, useState } from 'react';

export default function Header() {
  const [user, setUser] = useState<{ username: string; isAdmin: boolean } | null>(null);

  useEffect(() => {
    const checkUser = () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          setUser({ username: payload.username, isAdmin: payload.isAdmin });
        } catch {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };
    checkUser();
    window.addEventListener('storage', checkUser);
    // También escucha cambios de ruta para forzar actualización
    window.addEventListener('focus', checkUser);
    return () => {
      window.removeEventListener('storage', checkUser);
      window.removeEventListener('focus', checkUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <header className="flex justify-between items-center p-4 border-b">
      <span className="text-green-700 font-bold text-xl">Almaraza de Lubrín</span>
      <nav className="flex gap-6 items-center">
        <a href="/inicio">Inicio</a>
        <a href="/carrito">Carrito</a>
        {user?.isAdmin && <a href="/productos">Productos</a>}
        {!user && <a href="/login">Login</a>}
        {!user && <a href="/registro">Registro</a>}
        {user && (
          <>
            <span className="ml-4 font-semibold text-blue-700">
              Hola, {user.isAdmin ? 'administrador' : user.username}
            </span>
            <button
              onClick={handleLogout}
              className="ml-4 text-red-600 hover:underline"
            >
              Cerrar sesión
            </button>
          </>
        )}
      </nav>
    </header>
  );
}