'use client';
import { useEffect, useState } from 'react';
import { api } from '../api/api';

export default function ProductosPage() {
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);
  const [nuevoProducto, setNuevoProducto] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
  });

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) setToken(storedToken);
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    setLoading(true);
    try {
      const data = await api.getProducts();
      setProducts(data);
    } catch (e) {
      setProducts([]);
    }
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    await api.deleteProduct(id, token);
    cargarProductos();
  };

  const handleChange = (e: any) => {
    setNuevoProducto({ ...nuevoProducto, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e: any) => {
    e.preventDefault();
    await api.createProduct(
      {
        name: nuevoProducto.name,
        description: nuevoProducto.description,
        price: parseFloat(nuevoProducto.price),
        stock: parseInt(nuevoProducto.stock),
      },
      token
    );
    setNuevoProducto({ name: '', description: '', price: '', stock: '' });
    cargarProductos();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Productos</h1>
      {/* Formulario para crear producto */}
      <form onSubmit={handleCreate} className="mb-6">
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={nuevoProducto.name}
          onChange={handleChange}
          required
          className="border p-2 mr-2"
        />
        <input
          type="text"
          name="description"
          placeholder="Descripción"
          value={nuevoProducto.description}
          onChange={handleChange}
          required
          className="border p-2 mr-2"
        />
        <input
          type="number"
          name="price"
          placeholder="Precio"
          value={nuevoProducto.price}
          onChange={handleChange}
          required
          className="border p-2 mr-2"
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={nuevoProducto.stock}
          onChange={handleChange}
          required
          className="border p-2 mr-2"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Crear Producto
        </button>
      </form>
      {loading ? (
        <p>Cargando productos...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product: any) => (
            <div key={product.id} className="border p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-lg font-bold mt-2">{product.price}€</p>
              <p className="text-sm text-gray-500">Stock: {product.stock}</p>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => handleDelete(product.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}