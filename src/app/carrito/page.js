'use client';

import { useApp } from '../../context/AppContext';
import Link from 'next/link';

export default function Carrito() {
  const { cart, removeFromCart, updateCartQuantity, clearCart } = useApp();

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
    } else {
      updateCartQuantity(productId, newQuantity);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Tu carrito está vacío
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              ¡Agrega algunos de nuestros deliciosos aceites de oliva!
            </p>
            <Link 
              href="/"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-md font-medium transition-colors inline-flex items-center"
            >
              ← Continuar comprando
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Mi Carrito</h1>
          <button
            onClick={clearCart}
            className="text-red-600 hover:text-red-800 font-medium cursor-pointer"
          >
            Vaciar carrito
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de productos */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-600 mb-4">Productos ({cart.length})</h2>
                
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 p-4 border border-gray-200 rounded-lg">
                      {/* Imagen del producto */}
                      <div className="flex-shrink-0 w-full sm:w-24">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full sm:w-24 h-32 sm:h-24 object-contain rounded-md bg-gray-50"
                        />
                      </div>

                      {/* Información del producto */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-700 mb-2">
                          €{item.price.toFixed(2)} por unidad
                        </p>
                        
                        {/* Controles de cantidad para móvil */}
                        <div className="flex items-center justify-between sm:hidden">
                          <div className="flex items-center space-x-3">
                            <span className="text-sm font-medium text-gray-700">Cantidad:</span>
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-700 font-medium"
                              >
                                -
                              </button>
                              <span className="w-12 text-center font-medium text-gray-900">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-700 font-medium"
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700 p-2"
                            title="Eliminar producto"
                          >
                            🗑️
                          </button>
                        </div>
                        
                        {/* Precio total para móvil */}
                        <div className="text-right sm:hidden mt-2">
                          <p className="text-lg font-bold text-green-600">
                            €{(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>

                      {/* Controles de cantidad para desktop */}
                      <div className="hidden sm:flex items-center space-x-2">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-700 font-medium"
                        >
                          -
                        </button>
                        <span className="w-12 text-center font-medium text-gray-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-700 font-medium"
                        >
                          +
                        </button>
                      </div>

                      {/* Precio total del item para desktop */}
                      <div className="hidden sm:block text-right">
                        <p className="text-lg font-bold text-green-600">
                          €{(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>

                      {/* Botón eliminar para desktop */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="hidden sm:block text-red-500 hover:text-red-700 p-2"
                        title="Eliminar producto"
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Resumen del pedido */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-600">Resumen del pedido</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-800">
                  <span>Subtotal:</span>
                  <span className="font-medium">€{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-800">
                  <span>Envío:</span>
                  <span className="font-medium text-green-600">Gratis</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total:</span>
                    <span className="text-green-600">€{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-md font-medium transition-colors mb-4">
                Proceder al pago
              </button>

              <Link 
                href="/"
                className="block text-center text-green-600 hover:text-green-800 font-medium"
              >
                ← Continuar comprando
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 