'use client';

import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
  const { users, login, loginWithBackend } = useApp();
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Limpiar error al escribir
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Intentar login con el backend primero
      const result = await loginWithBackend(formData.email, formData.password);
      
      if (result.success) {
        router.push('/');
      } else {
        // Si falla el backend, intentar con datos locales como fallback
        const user = users.find(
          u => u.email === formData.email && u.password === formData.password
        );

        if (user) {
          login(user);
          router.push('/');
        } else {
          setError(result.message || 'Email o contraseña incorrectos');
        }
      }
    } catch (error) {
      console.error('Error en login:', error);
      setError('Error de conexión. Intenta de nuevo.');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo y título */}
        <div className="text-center">
          <img 
            src="/logo.jpeg" 
            alt="Logo" 
            className="mx-auto h-16 w-16 rounded-full object-cover"
          />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Iniciar Sesión
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Accede a tu cuenta para continuar
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* Formulario */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Correo electrónico
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="tu@email.com"
                />
              </div>
            </div>

            {/* Contraseña */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            {/* Botón submit */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                  isLoading 
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
                } transition-colors`}
              >
                {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </button>
            </div>
          </form>

          {/* Enlaces adicionales */}
          <div className="mt-6">
            <div className="text-center">
              <span className="text-sm text-gray-600">
                ¿No tienes una cuenta?{' '}
                <Link href="/registro" className="font-medium text-green-600 hover:text-green-500">
                  Regístrate aquí
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 