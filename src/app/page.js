'use client';

import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const { products: localProducts } = useApp();
  const [products, setProducts] = useState(localProducts);
  const [loading, setLoading] = useState(true);

  // Cargar productos desde el backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/products');
        if (response.ok) {
          const backendProducts = await response.json();
          setProducts(backendProducts);
        } else {
          // Si el backend no está disponible, usar productos locales
          setProducts(localProducts);
        }
      } catch (error) {
        console.error('Error al cargar productos del backend:', error);
        // Fallback a productos locales
        setProducts(localProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [localProducts]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Aceites de Oliva Premium
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            De nuestros olivares directamente a tu mesa
          </p>
          <p className="text-lg opacity-80">
            Descubre la tradición y calidad de Almaraza de Lubrín
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nuestros Productos
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Selecciona entre nuestra gama de aceites de oliva de la más alta calidad, 
              elaborados con las mejores aceitunas de la región.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="text-lg text-gray-600">Cargando productos...</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              ¿Por qué elegir nuestros aceites?
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🌿</div>
              <h4 className="text-xl font-semibold mb-2 text-green-600">100% Natural</h4>
              <p className="text-gray-600">
                Sin aditivos artificiales, directo del olivar a tu mesa
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🏆</div>
              <h4 className="text-xl font-semibold mb-2 text-green-600">Calidad Premium</h4>
              <p className="text-gray-600">
                Aceites galardonados con certificación de origen
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🚚</div>
              <h4 className="text-xl font-semibold mb-2 text-green-600">Entrega Rápida</h4>
              <p className="text-gray-600">
                Envío directo desde nuestras instalaciones
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
