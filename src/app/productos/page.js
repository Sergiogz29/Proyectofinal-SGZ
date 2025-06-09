// Server Component: protege la ruta y comprueba role
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import ProductosClient from './ProductosClient';

export default function ProductosPage() {
  const token = cookies().get('token')?.value;

  // Si no hay token, al login
  if (!token) {
    return redirect('/login');
  }

  // Decodificamos Base64
  let payload;
  try {
    payload = JSON.parse(Buffer.from(token, 'base64').toString('utf8'));
  } catch {
    return redirect('/login');
  }

  // Solo admin puede acceder
  if (payload.role !== 'admin') {
    return redirect('/');
  }

  // Si todo OK, renderizamos la UI cliente
  return <ProductosClient />;
}
