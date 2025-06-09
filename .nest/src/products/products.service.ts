import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private repo: Repository<Product>,
  ) {}

  create(dto: CreateProductDto) {
    const prod = this.repo.create(dto);
    return this.repo.save(prod);
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const prod = await this.repo.findOne({ where: { id } });
    if (!prod) throw new NotFoundException('Producto no encontrado');
    return prod;
  }

  async update(id: number, dto: UpdateProductDto) {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const prod = await this.findOne(id);
    return this.repo.remove(prod);
  }
}
