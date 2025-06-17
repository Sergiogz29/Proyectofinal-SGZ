'use client';

import { useApp } from '../context/AppContext';
import { useState } from 'react';

export default function ProductCard({ product }) {
  const { addToCart } = useApp();
  const [isAdding, setIsAdding] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    addToCart(product);
    
    // Simular un pequeño delay para feedback visual
    setTimeout(() => {
      setIsAdding(false);
    }, 500);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
      {/* Imagen del producto - tamaño fijo */}
      <div className="relative h-80 flex-shrink-0 overflow-hidden bg-gray-50 flex items-center justify-center">
        {imageError ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <div className="text-4xl mb-2">🖼️</div>
            <div className="text-sm">Imagen no disponible</div>
          </div>
        ) : (
          <img
            src={product.image}
            alt={product.name}
            className="max-w-full max-h-full object-contain hover:scale-105 transition-transform duration-300 p-4"
            style={{ maxHeight: '480px' }}
            onError={() => setImageError(true)}
            onLoad={() => setImageError(false)}
          />
        )}
        {product.stock < 10 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm">
            Stock limitado
          </div>
        )}
      </div>

      {/* Información del producto */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-8">
          {product.name}
        </h3>
        
        <div className="flex-grow mb-4">
          <p className="text-gray-600 text-sm leading-relaxed max-h-40 overflow-hidden">
            {product.description.length > 300 
              ? product.description.substring(0, 300) + '...' 
              : product.description
            }
          </p>
        </div>

        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-green-600">
            €{product.price.toFixed(2)}
          </span>
          <span className="text-sm text-gray-700">
            Stock: {product.stock}
          </span>
        </div>

        {/* Botón agregar al carrito - siempre al final */}
        <button
          onClick={handleAddToCart}
          disabled={isAdding || product.stock === 0}
          className={`w-full py-3 px-4 rounded-md font-medium transition-colors duration-200 ${
            product.stock === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : isAdding
              ? 'bg-green-500 text-white'
              : 'bg-green-600 hover:bg-green-700 text-white'
          }`}
        >
          {product.stock === 0 
            ? 'Sin stock' 
            : isAdding 
            ? 'Añadido'
            : 'Añadir al carrito'
          }
        </button>
      </div>
    </div>
  );
} 