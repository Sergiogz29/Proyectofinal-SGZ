const API_URL = 'http://localhost:3000';

export const api = {
  // Obtener todos los productos
  getProducts: async () => {
    const response = await fetch(`${API_URL}/products`);
    return response.json();
  },

  // Crear producto
  createProduct: async (product: any, token: string) => {
    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(product),
    });
    return response.json();
  },

  // Eliminar producto
  deleteProduct: async (id: number, token: string) => {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.json();
  },
};