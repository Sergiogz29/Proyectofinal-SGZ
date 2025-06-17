import { Injectable, NotFoundException } from '@nestjs/common';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

export class CreateProductDto {
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
}

export class UpdateProductDto {
  name?: string;
  description?: string;
  price?: number;
  image?: string;
  category?: string;
  stock?: number;
}

@Injectable()
export class ProductsService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Aceite de Oliva Premium',
      description: 'Aceite de oliva virgen extra de primera calidad',
      price: 15.99,
      image: '/aceite1.jpeg',
      category: 'Aceites',
      stock: 50,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      name: 'Aceite de Oliva Tradicional',
      description: 'Aceite de oliva virgen extra con sabor tradicional',
      price: 12.50,
      image: '/aceite2.jpeg',
      category: 'Aceites',
      stock: 30,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      name: 'Aceite de Oliva Ecológico',
      description: 'Aceite de oliva ecológico certificado',
      price: 18.75,
      image: '/aceite3.jpeg',
      category: 'Aceites',
      stock: 25,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 4,
      name: 'Aceite de Oliva Intenso',
      description: 'Aceite de oliva con sabor intenso y robusto',
      price: 16.90,
      image: '/aceite4.jpeg',
      category: 'Aceites',
      stock: 40,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 5,
      name: 'Aceite de Oliva Gourmet',
      description: 'Aceite de oliva gourmet para los paladares más exigentes',
      price: 22.00,
      image: '/aceite5.jpeg',
      category: 'Aceites',
      stock: 15,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  private nextId = 6;

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: number): Product {
    const product = this.products.find(p => p.id === id);
    if (!product) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    return product;
  }

  create(createProductDto: CreateProductDto): Product {
    const newProduct: Product = {
      id: this.nextId++,
      ...createProductDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, updateProductDto: UpdateProductDto): Product {
    const productIndex = this.products.findIndex(p => p.id === id);
    if (productIndex === -1) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    
    this.products[productIndex] = {
      ...this.products[productIndex],
      ...updateProductDto,
      updatedAt: new Date(),
    };
    
    return this.products[productIndex];
  }

  remove(id: number): void {
    const productIndex = this.products.findIndex(p => p.id === id);
    if (productIndex === -1) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    this.products.splice(productIndex, 1);
  }
} 