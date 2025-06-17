import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configurar CORS para permitir peticiones desde el frontend
  app.enableCors({
    origin: 'http://localhost:3000', // URL del frontend Next.js
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  });

  // Prefijo global para todas las rutas de la API
  app.setGlobalPrefix('api');
  
  await app.listen(process.env.PORT ?? 3001);
  console.log('Backend ejecutándose en http://localhost:3001');
}
bootstrap();
