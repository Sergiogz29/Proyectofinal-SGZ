# Backend - Almaraz de Lubrín

Backend desarrollado con NestJS para la aplicación de Almaraz de Lubrín, incluyendo autenticación JWT y gestión de productos.

## Características

- **Autenticación JWT**: Sistema de login seguro con tokens
- **Gestión de Usuarios**: Administrador y usuarios normales
- **CRUD de Productos**: Solo administradores pueden crear, editar y eliminar productos
- **CORS configurado**: Permite peticiones desde el frontend Next.js

## Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Ejecutar en modo desarrollo:
```bash
npm run start:dev
```

El backend estará disponible en `http://localhost:3001`

## API Endpoints

### Autenticación
- `POST /api/auth/login` - Iniciar sesión

### Productos
- `GET /api/products` - Obtener todos los productos (público)
- `GET /api/products/:id` - Obtener producto por ID (público)
- `POST /api/products` - Crear producto (solo admin)
- `PATCH /api/products/:id` - Actualizar producto (solo admin)
- `DELETE /api/products/:id` - Eliminar producto (solo admin)

## Usuarios de Prueba

### Administrador
- **Email**: admin@example.com
- **Contraseña**: admin123
- **Rol**: admin

### Usuario Normal
- **Email**: usuario@example.com
- **Contraseña**: usuario123
- **Rol**: user

## Estructura de Datos

### Producto
```json
{
  "id": 1,
  "name": "Nombre del producto",
  "description": "Descripción del producto",
  "price": 15.99,
  "image": "/images/producto.jpg",
  "category": "Categoría",
  "stock": 50,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

## Autenticación

Para usar las rutas protegidas, incluir el token JWT en el header:
```
Authorization: Bearer <token>
```

## Scripts Disponibles

- `npm run start` - Ejecutar en producción
- `npm run start:dev` - Ejecutar en desarrollo con hot reload
- `npm run build` - Compilar para producción
- `npm run test` - Ejecutar tests

## Ejemplo de Uso

### 1. Login
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "admin123"
  }'
```

### 2. Crear Producto (requiere token de admin)
```bash
curl -X POST http://localhost:3001/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name": "Nuevo Producto",
    "description": "Descripción del nuevo producto",
    "price": 12.99,
    "image": "/images/nuevo-producto.jpg",
    "category": "Nueva Categoría",
    "stock": 100
  }'
```
