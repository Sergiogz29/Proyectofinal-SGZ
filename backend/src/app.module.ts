import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { User } from './entities/user.entity';
import { Product } from './entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Product],
      synchronize: true,
    }),
    AuthModule,
    ProductsModule,
  ],
})
export class AppModule {}