import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { CreateProductDto } from '../dto/create-product.dto';
export declare class ProductsService {
    private productsRepository;
    constructor(productsRepository: Repository<Product>);
    create(createProductDto: CreateProductDto): Promise<Product>;
    findAll(): Promise<Product[]>;
    findOne(id: number): Promise<Product>;
    update(id: number, updateProductDto: CreateProductDto): Promise<Product>;
    remove(id: number): Promise<void>;
}
