'use client';

import { useState } from 'react';
import { useApp } from '../../context/AppContext';

export default function ProductosClient() {
  const { products, addProduct, updateProduct, deleteProduct } = useApp();
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    stock: '',
  });

  const startEdit = prod => {
    setEditingId(prod.id);
    setForm({
      name: prod.name,
      description: prod.description,
      price: prod.price,
      image: prod.image,
      stock: prod.stock,
    });
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({ name: '', description: '', price: '', image: '', stock: '' });
  };

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    const payload = {
      id: editingId ?? Date.now(),
      name: form.name,
      description: form.description,
      price: parseFloat(form.price),
      image: form.image,
      stock: parseInt(form.stock, 10),
    };
    if (editingId) updateProduct(payload);
    else addProduct(payload);
    resetForm();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-4">Gestión de Productos</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow mb-6 max-w-md"
      >
        <h2 className="text-xl font-semibold mb-2">
          {editingId ? 'Editar Producto' : 'Crear Producto'}
        </h2>

        {['name','description','price','image','stock'].map(field => (
          <div key={field} className="mb-3">
            <label className="block text-sm font-medium mb-1 capitalize">
              {field}
            </label>
            <input
              type={field === 'price' ? 'number' : 'text'}
              name={field}
              value={form[field]}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        ))}

        <div className="flex space-x-2">
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            {editingId ? 'Guardar cambios' : 'Crear Producto'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-gray-200">
              {['Nombre','Descripción','Precio','Stock','Acciones'].map(h => (
                <th key={h} className="px-4 py-2 text-left">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map(prod => (
              <tr key={prod.id} className="border-t">
                <td className="px-4 py-2">{prod.name}</td>
                <td className="px-4 py-2">{prod.description}</td>
                <td className="px-4 py-2">€{prod.price.toFixed(2)}</td>
                <td className="px-4 py-2">{prod.stock}</td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => startEdit(prod)}
                    className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => deleteProduct(prod.id)}
                    className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
