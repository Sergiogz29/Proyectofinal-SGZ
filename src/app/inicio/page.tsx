'use client';
import { useEffect, useState } from 'react';
import { api } from '../api/api';

export default function InicioPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.getProducts().then(setProducts);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Nuestros Productos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product: any) => (
          <div key={product.id} className="border p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-lg font-bold mt-2">{product.price}€</p>
            <p className="text-sm text-gray-500">Stock: {product.stock}</p>
          </div>
        ))}
      </div>
    </div>
  );
}